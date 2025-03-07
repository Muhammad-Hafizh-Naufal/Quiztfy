import { Form, Button, Container } from "react-bootstrap";
import AuthImage from "/assets/auth.png";
import "../../../src/styles/Auth.css";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import { useState } from "react";
import Loading from "../Loading";

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

        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page bg-white">
      <Container className="mt-5">
        <div className="row align-items-center auth-container">
          <div className="col auth-image">
            <img
              src={AuthImage}
              alt="Login Illustration"
              className="img-left"
            />
          </div>

          <div className="col auth-form">
            <div className="p-4 content">
              <h2 className="text-start">Welcome To Tech Quiztify</h2>
              <p className="mb-4 text-start">Login your account</p>
              {message && <p className="alert alert-info">{message}</p>}
              <p className="text-start intruction">
                Please enter your e-mail and password
              </p>

              {loading ? (
                <Loading show={loading} />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
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
                    className="d-flex justify-content-center mx-auto"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginContent;
