
/**
 * security/middleware/authMiddleware.js
 *
 * Express middleware that validates the JWT on every protected route.
 * Attaches the decoded user payload to req.user for downstream handlers.
 *
 * INJECTION POINT (server.js):
 *   const { authMiddleware } = require('./security/middleware/authMiddleware');
 *   app.use('/api/scan',   authMiddleware, scanRouter);
 *   app.use('/api/admin',  authMiddleware, adminRouter);
 *
 * THREAT MODEL:
 *   - Token is read from Authorization header only (not cookies or query
 *     params) to prevent CSRF and accidental token logging in server logs.
 *   - JsonWebTokenError and TokenExpiredError are caught and re-thrown as
 *     safe SecurityError objects so the global error handler can return
 *     consistent, non-leaking responses.
 *   - The DB lookup on every request confirms the user's CURRENT role and
 *     approval status — a role change by the admin takes effect immediately
 *     on the next request without waiting for the token to expire.
 *
 * NOTE FOR BACKEND TEAM:
 *   Replace the placeholder `User.findById` call with your actual Mongoose
 *   User model import. The interface expected is:
 *     User.findById(id).select('role status').lean()
 *   which should return { role, status } or null.
 */
 
'use strict';
 
const { verifyAccessToken, extractBearerToken } = require('../utils/tokenUtils');
const { logAuditEvent, logAccessDenied }         = require('../audit/auditLogger');
const { AUDIT_EVENTS }                           = require('../audit/auditEvents');
 
// ── Lightweight security error class ──────────────────────────────────────
class SecurityError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name       = 'SecurityError';
    this.statusCode = statusCode;
    this.isOperational = true; // tells errorHandler this is expected
  }
}
 
/**
 * authMiddleware
 *
 * Verifies the Bearer JWT, confirms the user is still approved in the DB,
 * and attaches { id, role, status } to req.user.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function authMiddleware(req, res, next) {
  try {
    // 1. Extract token from Authorization header
    const token = extractBearerToken(req.headers.authorization);
    if (!token) {
      logAccessDenied({ reason: 'AUTH', req });
      return next(new SecurityError('Authentication token is required.', 401));
    }
 
    // 2. Verify token signature and expiry
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (jwtError) {
      logAuditEvent({
        event:      AUDIT_EVENTS.TOKEN_INVALID,
        req,
        statusCode: 401,
        level:      'warn',
        meta:       { reason: jwtError.name },
      });
 
      // Return a generic message — do NOT forward jwtError.message which
      // reveals token structure details (e.g. "invalid signature").
      const msg = jwtError.name === 'TokenExpiredError'
        ? 'Your session has expired. Please log in again.'
        : 'Invalid authentication token.';
      return next(new SecurityError(msg, 401));
    }
 
    // 3. Confirm user still exists and is still approved in the database.
    //    ─────────────────────────────────────────────────────────────────
    //    BACKEND TEAM: Replace the stub below with your actual User model.
    //    ─────────────────────────────────────────────────────────────────
    let dbUser;
    try {
      // Stub — swap for: const User = require('../models/User');
      const User = req.app.get('UserModel'); // injected by backend via app.set()
      dbUser = await User.findById(decoded.sub).select('role status').lean();
    } catch (dbError) {
      // DB failure should not leak schema details
      return next(new SecurityError('Authentication service unavailable.', 503));
    }
 
    if (!dbUser) {
      logAccessDenied({ reason: 'AUTH', req, userId: decoded.sub });
      return next(new SecurityError('Account not found.', 401));
    }
 
    if (dbUser.status !== 'Approved') {
      logAccessDenied({ reason: 'STATUS', req, userId: decoded.sub });
      return next(
        new SecurityError(
          'Your account is pending administrator approval.',
          403
        )
      );
    }
 
    // 4. Attach safe user context — never attach the full DB document
    req.user = {
      id:     decoded.sub,
      role:   dbUser.role,
      status: dbUser.status,
    };
 
    logAuditEvent({
      event:  AUDIT_EVENTS.ACCESS_GRANTED,
      userId: decoded.sub,
      req,
    });
 
    next();
  } catch (err) {
    next(err);
  }
}
 
module.exports = { authMiddleware, SecurityError };