import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import AuthImage from "/assets/auth.png";
import "../../../src/styles/Auth.css";

function LoginContent() {
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
              <p className="text-start intruction">
                Please enter your e-mail and password
              </p>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginContent;
