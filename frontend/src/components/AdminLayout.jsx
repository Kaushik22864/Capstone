import { NavLink, useNavigate } from "react-router-dom";
import "../styles/adminLayout.css";

import logo from "../assets/logo-1.webp";

function AdminLayout({ children, active }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div>

          <div className="sidebar-logo">
            <img src={logo} alt="OPTIScan Logo" />
            <h2>OPTIScan</h2>
          </div>

          <nav className="sidebar-menu">

            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive || active === "dashboard" ? "active" : ""
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/user-management"
              className={({ isActive }) =>
                isActive || active === "users" ? "active" : ""
              }
            >
              User Management
            </NavLink>

            <NavLink
              to="/doctor-verification"
              className={({ isActive }) =>
                isActive || active === "verification" ? "active" : ""
              }
            >
              Doctor Verification
            </NavLink>

          </nav>

        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Log out
        </button>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        <div className="admin-header">

          <div></div>

          <div className="header-icons">

            <span className="notification">
              🔔
            </span>

            <span className="profile">
              👤
            </span>

          </div>

        </div>

        {children}

      </main>

    </div>
  );
}

export default AdminLayout;