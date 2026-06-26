import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const recentRequests = [
    {
      id: 1,
      doctor: "Dr. Sarah Chen",
      email: "sarah.chen@hospital.com",
      medicalId: "MD-8829-XJ",
      specialization: "Cardiology",
      submitted: "Oct 24, 2023",
      status: "Awaiting OCR",
    },
    {
      id: 2,
      doctor: "Dr. James Wilson",
      email: "jwilson@visioncare.org",
      medicalId: "MD-1932-PL",
      specialization: "Retina",
      submitted: "Oct 24, 2023",
      status: "Awaiting OCR",
    },
    {
      id: 3,
      doctor: "Dr. Emily Brown",
      email: "ebrown@cityeye.com",
      medicalId: "MD-5521-ZR",
      specialization: "Glaucoma",
      submitted: "Oct 23, 2023",
      status: "Awaiting OCR",
    },
  ];

  return (
    <AdminLayout active="dashboard">
      <main className="dashboard-main">

        {/* Welcome */}

        <div className="dashboard-header">
          <h1>Welcome Admin!</h1>
        </div>

        {/* Stats */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon">👥</span>
              <small className="positive">↗ +12.5%</small>
            </div>

            <p>Total Users</p>
            <h2>0</h2>

          </div>

          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon">🩺</span>
              <small className="positive">↗ +4.2%</small>
            </div>

            <p>Verified Doctors</p>
            <h2>0</h2>

          </div>

          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon">📋</span>
              <small className="warning">42 Active</small>
            </div>

            <p>Pending Requests</p>
            <h2>0</h2>

          </div>

        </div>

        {/* Graph & Summary */}

        <div className="dashboard-middle">

          <div className="graph-card">

            <div className="graph-header">
              <h3>User Growth</h3>
              <span>● Doctors</span>
            </div>

            <div className="graph">
              <div className="bar h40"></div>
              <div className="bar h70"></div>
              <div className="bar h65"></div>
              <div className="bar h75"></div>
              <div className="bar h85"></div>
              <div className="bar h70"></div>
              <div className="bar h85"></div>
            </div>

            <div className="graph-days">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>

          <div className="dashboard-sidecards">

            <div className="small-card">
              <small>VERIFIED TODAY</small>
              <h2>158</h2>
              <p>Consistency rating: 98.4%</p>
            </div>

            <div className="small-card">
              <small>REJECTED REQUESTS</small>
              <h2>9</h2>
              <p>Flagged for document fraud</p>
            </div>

          </div>

        </div>

        {/* Recent Requests */}

        <div className="requests-card">

          <div className="requests-header">

            <h3>Recent Access Requests</h3>

            <Link to="/doctor-verification">
              View All
            </Link>

          </div>

          <table>

            <thead>

              <tr>
                <th>Doctor Name</th>
                <th>Medical ID</th>
                <th>Specialization</th>
                <th>Submission Date</th>
                <th>Document Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {recentRequests.map((doctor) => (

                <tr key={doctor.id}>

                  <td>

                    <div className="doctor-info">
                      <strong>{doctor.doctor}</strong>
                      <p>{doctor.email}</p>
                    </div>

                  </td>

                  <td>{doctor.medicalId}</td>

                  <td>

                    <span className="specialization-badge">
                      {doctor.specialization}
                    </span>

                  </td>

                  <td>{doctor.submitted}</td>

                  <td>

                    <span className="pending-status">
                      ● {doctor.status}
                    </span>

                  </td>

                  <td className="action-buttons">

                    <button className="view-button">
                      View Credentials
                    </button>

                    <button className="approve-button">
                      Approve
                    </button>

                    <button className="reject-button">
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>
    </AdminLayout>
  );
}

export default AdminDashboard;