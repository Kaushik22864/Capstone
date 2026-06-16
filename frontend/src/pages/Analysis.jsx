import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/analysis.css";

function Analysis() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an OCT image first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://au6zjukrzlky36hgjsy73aiwae0jzvfu.lambda-url.ap-south-1.on.aws/",
        {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }
      );

      const { uploadUrl, key } = response.data;

      await axios.put(uploadUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      await axios.post(
        "http://localhost:5000/api/patients",
        {
          imageKey: key,
        }
      );

      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="analysis-page">

      <div className="analysis-layout">

        {/* SIDEBAR */}
        <aside className="analysis-sidebar">

          <div className="analysis-sidebar-top">

            <img
              src="/logo-1.webp"
              alt="Logo"
              className="analysis-logo"
            />

            <h2>OPTIScan</h2>

            <nav className="analysis-menu">

              <a href="#">
                Dashboard
              </a>

              <a href="#" className="active">
                Analysis
              </a>

              <a href="#">
                Scan History
              </a>

              <a href="#">
                Settings
              </a>

            </nav>

          </div>

          <Link to="/" className="analysis-logout-btn">
            Log Out
          </Link>

        </aside>

        {/* MAIN CONTENT */}
        <main className="analysis-main-content">

          {/* TOPBAR */}
          <div className="analysis-topbar">

            <div className="analysis-search-box">
              <input
                type="text"
                placeholder="Search patients, scans or reports..."
              />
            </div>

            <div className="analysis-top-icons">

              <div className="analysis-notification"></div>

              <div className="analysis-profile">
                <img
                  src="/profile.png"
                  alt="Profile"
                />
              </div>

            </div>

          </div>

          {/* TITLE */}
          <div className="analysis-page-title">

            <h1>Analyze OCT Scan</h1>

            <p>
              Upload a retinal OCT image for AI-assisted diagnosis.
            </p>

          </div>

          {/* GRID */}
          <div className="analysis-content-grid">

            {/* LEFT */}
            <div className="analysis-left-panel">

              <div className="analysis-upload-box">

                <div className="analysis-upload-content">

                  <div className="analysis-upload-icon">
                    ↑
                  </div>

                  <h2>
                    Drag & Drop OCT Image
                  </h2>

                  <p>
                    Supports JPG, PNG
                    (High Resolution Recommended)
                  </p>

                  <label className="analysis-browse-btn">

                    Browse Files

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedFile(
                          e.target.files[0]
                        )
                      }
                    />

                  </label>

                  {selectedFile && (
                    <p>
                      Selected:
                      {" "}
                      {selectedFile.name}
                    </p>
                  )}

                </div>

              </div>

              {/* AI CARD */}
              <div className="analysis-ai-card">

                <div className="analysis-ai-header">

                  <h3>
                    AI Engine v1.0
                  </h3>

                  <p>
                    Ready for diagnostic sweep
                  </p>

                </div>

                <button
                  className="analysis-analyze-btn"
                  onClick={handleUpload}
                >
                  Run AI Analysis
                </button>

                <div className="analysis-status-row">

                  <span>
                    Processing Status
                  </span>

                  <span>
                    Waiting for trigger
                  </span>

                </div>

                <div className="analysis-progress-bar">
                  <div className="analysis-progress"></div>
                </div>

                <small>
                  HIPAA Compliant Processing
                </small>

              </div>

            </div>

            {/* RIGHT */}
            <div className="analysis-right-panel">

              <div className="analysis-patient-card">

                <h3>
                  Patient Information
                </h3>

                <div className="analysis-input-group">

                  <label>
                    Patient Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                  />

                </div>

                <div className="analysis-row">

                  <div className="analysis-input-group">

                    <label>
                      Patient ID
                    </label>

                    <input
                      type="text"
                      placeholder="PID-12345"
                    />

                  </div>

                  <div className="analysis-input-group">

                    <label>
                      Date of Birth
                    </label>

                    <input type="date" />

                  </div>

                </div>

                <div className="analysis-input-group">

                  <label>
                    Laterality
                  </label>

                  <div className="analysis-eye-buttons">

                    <button>
                      Left (OS)
                    </button>

                    <button>
                      Right (OD)
                    </button>

                  </div>

                </div>

                <div className="analysis-input-group">

                  <label>
                    Clinical Notes
                  </label>

                  <textarea
                    placeholder="Symptoms, medical history..."
                  ></textarea>

                </div>

              </div>

              <div className="analysis-notice-card">

                <h4>
                  Important Notice
                </h4>

                <p>
                  AI results are for diagnostic support only.
                  Final clinical assessment must be performed
                  by a qualified ophthalmologist.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Analysis;