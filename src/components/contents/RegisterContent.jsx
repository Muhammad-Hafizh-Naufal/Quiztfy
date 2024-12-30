import React from "react";
import "../../../src/styles/Auth.css";
import AuthImage from "/assets/auth.png";

function RegisterContent() {
  return (
    <div className="auth-page bg-white">
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

              <form>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterContent;
