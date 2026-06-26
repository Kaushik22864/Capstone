import AdminLayout from "../components/AdminLayout";
import "../styles/doctorCredentialReview.css";

function DoctorCredentialReview() {

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

  return (
    <AdminLayout active="verification">

      <div className="credential-review-page">

        <div className="credential-review-main">

          {/* Breadcrumb */}

          <div className="breadcrumb">

            Verification

            <span>{">"}</span>

            <strong>{doctor.name}</strong>

          </div>

          {/* Doctor Header */}

          <div className="doctor-profile-card">

            <div className="doctor-profile-left">

              <div className="doctor-profile-avatar">

                {doctor.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)}

              </div>

              <div>

                <h2>{doctor.name}</h2>

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

                  <button title="Zoom">
                    🔍
                  </button>

                  <button title="Download">
                    ⬇️
                  </button>

                </div>

              </div>

              <div className="document-preview">

                <img
                  src={doctor.document}
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

                  <p>{doctor.name}</p>

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

                  <p>{doctor.experience}</p>

                </div>

                <div>

                  <label>Submission Date</label>

                  <p>{doctor.submitted}</p>

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

              <button className="reject-btn">
                Reject
              </button>

              <button className="approve-btn">
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