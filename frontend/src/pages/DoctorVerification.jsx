import AdminLayout from "../components/AdminLayout";
import "../styles/doctorVerification.css";

function DoctorVerification() {
  const applications = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@hospital.com",
      specialization: "Cardiology",
      submissionDate: "Oct 24, 2023",
      status: "Awaiting OCR",
    },
    {
      id: 2,
      name: "Dr. Marcus Thorne",
      email: "m.thorne@medcenter.org",
      specialization: "Neurology",
      submissionDate: "Oct 23, 2023",
      status: "In Review",
    },
    {
      id: 3,
      name: "Dr. Elena Rodriguez",
      email: "elena.rod@healthmail.com",
      specialization: "Pediatrics",
      submissionDate: "Oct 22, 2023",
      status: "Flagged / ID mismatch",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "j.wilson@surgery.com",
      specialization: "General Surgery",
      submissionDate: "Oct 21, 2023",
      status: "Verification Ready",
    },
  ];

  return (
    <AdminLayout>

      <main className="verification-main">

        {/* Header */}

        <div className="verification-header">

          <h1>Doctor Verification</h1>

          <p>
            Manage the clinical onboarding queue. Review submitted
            medical licenses, specialization credentials and verify
            identities before granting access to the platform.
          </p>

        </div>

        {/* Verification Table */}

        <div className="verification-card">

          <div className="card-header">

            <h3>Pending Medical Verifications</h3>

            <span className="action-required">
              Action Required: 24
            </span>

          </div>

          <table>

            <thead>

              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Submission Date</th>
                <th>Document Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {applications.map((doctor) => (

                <tr key={doctor.id}>

                  <td>

                    <div className="doctor-info">

                      <div className="doctor-avatar">
                        {doctor.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .substring(0, 2)}
                      </div>

                      <div>

                        <strong>{doctor.name}</strong>

                        <p>{doctor.email}</p>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span className="specialization-tag">
                      {doctor.specialization}
                    </span>

                  </td>

                  <td>{doctor.submissionDate}</td>

                  <td>

                    <span
                      className={`doc-status ${doctor.status
                        .toLowerCase()
                        .replace(/\s|\//g, "-")}`}
                    >
                      {doctor.status}
                    </span>

                  </td>

                  <td className="verification-actions">

                    <button className="credential-btn">
                      View Credentials
                    </button>

                    <button className="approve-btn">
                      Approve
                    </button>

                    <button className="reject-btn">
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="table-footer">

            <span>
              Showing 1 to 4 of 24 applications
            </span>

            <div className="pagination">

              <button>{"<"}</button>

              <button className="active-page">
                1
              </button>

              <button>2</button>

              <button>3</button>

              <button>{">"}</button>

            </div>

          </div>

        </div>

      </main>

    </AdminLayout>
  );
}

export default DoctorVerification;