import "../../../src/styles/Auth.css";
import { useState } from "react";
import Loading from "../Loading";
import service from "../../services/service";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Variasi animasi untuk scale
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="auth-page bg-white vh-100">
      <div className="container mt-5">
        <div className="row align-items-center auth-container">
          {/* Carousel */}
          <motion.div
            id="carouselExampleAutoplaying"
            className="carousel slide col d-none d-md-block"
            data-bs-ride="carousel"
            style={{ maxHeight: "400px", overflow: "hidden" }}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="assets/Frame-1.png"
                  className="d-block object-fit-cover"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/Frame-2.png"
                  className="d-block object-fit-cover"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/Frame-3.png"
                  className="d-block object-fit-cover"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col auth-form"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContent;
