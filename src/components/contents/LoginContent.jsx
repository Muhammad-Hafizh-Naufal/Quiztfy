import { Form, Button } from "react-bootstrap";
// import AuthImage from "/assets/auth.png";
import "../../../src/styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/service";
import { useState } from "react";
import Loading from "../Loading";
import { motion } from "framer-motion";

function LoginContent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await service.login(formData);
      setMessage(response.message);

      setFormData({
        email: "",
        password: "",
      });

      if (response.token) {
        localStorage.setItem("token", response.token);

        navigate("/dashboard");
      }
    } catch (error) {
      // setMessage(error.response?.data?.message || "Failed to login");
      // Super safe error message handling
      let errorMessage = "Registration failed. Please try again.";

      if (error && typeof error === "object") {
        if (error.message && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Animation
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
    <div className="auth-page bg-white vh-100 my-auto ">
      <div className="mt-5 container ">
        {/* navigasi Kembali */}
        <div className="justify-content-center position-relative">
          <Link
            className=" d-none d-md-block position-absolute top-0 start-0 ms-4"
            to={"/"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill text-warning "
              viewBox="0 0 16 16"
              style={{ width: "50px" }}
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center auth-container">
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
            className="col auth-form"
            variants={scaleUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="p-4 content">
              <motion.h2
                className="text-start"
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Welcome To Tech Quiztify
              </motion.h2>
              <motion.p
                className="mb-4 text-start"
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Login your account
              </motion.p>
              {message && (
                <motion.p
                  className="alert alert-info"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {message}
                </motion.p>
              )}
              <motion.p
                className="text-start intruction"
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Please enter your e-mail and password
              </motion.p>

              {loading ? (
                <Loading show={loading} />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3  " controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Button
                    className="d-flex btn-warning justify-content-center mx-auto"
                    type="submit"
                  >
                    Login
                  </Button>
                  <motion.p
                    className="text-center m-3"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    Already have an account?{" "}
                    <Link className="text-dark fw-bold" to="/register">
                      register
                    </Link>
                  </motion.p>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
