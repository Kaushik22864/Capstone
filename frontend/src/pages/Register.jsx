import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hospital: "",
    specialization: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const previousStep = () => {
    setStep(1);
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/specialists/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            experience: Number(formData.experience),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/verification-pending");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend");
    }
  };

  return (
  <div className="register-page">
    <div className="container">
      <div className="card">

        <h1>Specialist Registration</h1>

        <div className="progress">
          <div className="active"></div>
          <div className={step === 2 ? "active" : ""}></div>
        </div>

        {step === 1 ? (
          <form onSubmit={nextStep}>

            <div className="row">
              <div className="input-group">
                <label>First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group full">
              <label>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group full">
              <label>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn" type="submit">
              Next Step
            </button>

            <div className="divider">
              <span></span>
              <span></span>
            </div>

            <p className="login-text">
              Already Verified? <Link to="/login">Login</Link>
            </p>

          </form>
        ) : (
          <form onSubmit={submitApplication}>

            <h2 className="section-title">
              Professional Credentials
            </h2>

            <div className="input-group full">
              <label>Hospital / Clinic</label>
              <input
                id="hospital"
                type="text"
                placeholder="Enter hospital/clinic name"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="input-group">
                <label>Specialization</label>
                <input
                  id="specialization"
                  type="text"
                  placeholder="Enter your specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Experience Year</label>
                <input
                  id="experience"
                  type="number"
                  placeholder="Years of experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="upload-box">
              <p>⬆</p>
              <span>
                Click to upload or drag to drop
              </span>

              <input type="file" />
            </div>

            <div className="button-group">

              <button
                type="button"
                className="btn-back"
                onClick={previousStep}
              >
                Back
              </button>

              <button
                type="submit"
                className="btn-submit"
              >
                Submit Application
              </button>

            </div>

            <div className="divider">
              <span></span>
              <span></span>
            </div>

            <p className="login-text">
              Already Verified? <Link to="/login">Login</Link>
            </p>

          </form>
        )}

      </div>
    </div>
    </div>
  );
}

export default Register;