import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/doctorCredentialReview.css";

function DoctorCredentialReview() {
  /*
  // Dummy data (replace with backend later)

  const doctor = {
    name: "Dr. Elena Rodriguez",
    email: "elena.rodriguez@stjude.org",
    specialization: "Pediatrics",
    hospital: "St. Jude Children's Research",
    experience: "12 Years",
    submitted: "Oct 12, 2026",

    document:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
  };
  */

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/application/${id}`
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);

      if (data.success && data.doctor) {
        setDoctor(data.doctor);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const approveDoctor = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/application/${id}/approve`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      alert(data.message);

      navigate("/doctor-verification");
    } catch (err) {
      console.error(err);
    }
  };

  const rejectDoctor = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/application/${id}/reject`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      alert(data.message);

      navigate("/doctor-verification");
    } catch (err) {
      console.error(err);
    }
  };

  if (!doctor) {
    return (
      <AdminLayout active="verification">
        <div className="credential-review-page">
          <h2>Loading...</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout active="verification">
      <div className="credential-review-page">
        <div className="credential-review-main">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            Verification
            <span>{">"}</span>
            <strong>
              {doctor.firstName} {doctor.lastName}
            </strong>
          </div>

          {/* Doctor Header */}
          <div className="doctor-profile-card">
            <div className="doctor-profile-left">
              <div className="doctor-profile-avatar">
                {(doctor.firstName[0] + doctor.lastName[0]).toUpperCase()}
              </div>

              <div>
                <h2>
                  {doctor.firstName} {doctor.lastName}
                </h2>

                <p>
                  {doctor.specialization}
                  <span> • </span>
                  {doctor.hospital}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="credential-grid">
            {/* Document */}
            <div className="document-card">
              <div className="document-header">
                <h3>Document Evidence</h3>

                <div className="document-actions">
                  <button title="Zoom">🔍</button>
                  <button title="Download">⬇️</button>
                </div>
              </div>

              <div className="document-preview">
                <img
                  src="https://placehold.co/800x1000?text=Medical+License"
                  alt="Medical License"
                />
              </div>
            </div>

            {/* User Data */}
            <div className="user-data-card">
              <h3>User Data</h3>

              <div className="user-data-grid">
                <div>
                  <label>Full Name</label>
                  <p>
                    {doctor.firstName} {doctor.lastName}
                  </p>
                </div>

                <div>
                  <label>Email Address</label>
                  <p>{doctor.email}</p>
                </div>

                <div>
                  <label>Hospital / Clinic</label>
                  <p>{doctor.hospital}</p>
                </div>

                <div>
                  <label>Specialization</label>
                  <p>{doctor.specialization}</p>
                </div>

                <div>
                  <label>Experience</label>
                  <p>{doctor.experience} Years</p>
                </div>

                <div>
                  <label>Submission Date</label>
                  <p>{new Date(doctor.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="credential-footer">
            <button className="request-btn">
              Request More Info
            </button>

            <div>
              <button
                className="reject-btn"
                onClick={rejectDoctor}
              >
                Reject
              </button>

              <button
                className="approve-btn"
                onClick={approveDoctor}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DoctorCredentialReview;