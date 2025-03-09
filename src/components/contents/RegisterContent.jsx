import "../../../src/styles/Auth.css";
import AuthImage from "/assets/auth.png";
import { useState } from "react";
import Loading from "../Loading";
import service from "../../services/service";
import { useNavigate, Link } from "react-router-dom";

function RegisterContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await service.register(formData);
      setMessage(response.message);
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page bg-white vh-100">
      <div className="container mt-5">
        <div className="row align-items-center auth-container">
          {/* Gambar */}
          <div className="col auth-image">
            <img
              src={AuthImage}
              alt="Register Illustration"
              className="img-left"
            />
          </div>

          {/* Form */}
          <div className="col auth-form">
            <div className="p-4 content">
              <h2 className="text-start">Welcome To Tech Quiztify</h2>
              <p className="mb-4 text-start">Register your account</p>
              <p className="text-start intruction">
                Please fill in the information below
              </p>
              {message && <p className="alert alert-info">{message}</p>}

              {loading ? (
                <Loading show={loading} />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="FullName"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                  </div>

                  <button
                    className="d-flex justify-content-center mx-auto btn btn-primary"
                    type="submit"
                  >
                    Register
                  </button>
                  <p className="text-center m-3">
                    Already have an account?{" "}
                    <Link className="text-dark fw-bold" to="/login">
                      Login
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContent;
