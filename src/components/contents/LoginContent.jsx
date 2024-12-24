import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import loginImage from "../../../public/assets/1_login.png";
import "../../../src/styles/Login.css";

function LoginContent() {
  return (
    <div className="login-page bg-white">
      <Container className="mt-5">
        <Row className="align-items-center">
          {/* ilustrasi */}
          <Col md={6} className="text-start">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="img-left"
            />
          </Col>

          {/* Form */}
          <Col md={6}>
            <div className="p-4 auth ">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginContent;
