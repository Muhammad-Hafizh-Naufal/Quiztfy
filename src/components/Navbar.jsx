import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-bottom-5 shadow sticky-top">
      <div className="container-fluid">
        {/* Logo dan Nama Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="assets/LOGO FULL.png"
            alt="Logo"
            height="60"
            className="d-inline-block align-top me-2"
          />
        </a>

        {/* Jika bukan halaman login, tampilkan tombol toggle untuk menu */}
        {!isLoginPage && (
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
            aria-controls="navbarOffcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Menu Navbar dengan Offcanvas untuk Mobile, ditampilkan hanya jika bukan halaman login */}
        {!isLoginPage && (
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="navbarOffcanvas"
            aria-labelledby="navbarOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav mx-auto fw-bold text-center nav-list">
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link position-relative px-3"
                    href="#"
                  >
                    <span className="position-relative">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/about"}
                    className="nav-link position-relative px-3"
                  >
                    <span className="position-relative">About Us</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/Team"}
                    className="nav-link position-relative px-3"
                    href="#"
                  >
                    <span className="position-relative">Team</span>
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 justify-content-center">
                <p className="m-0 d-none d-sm-block">
                  Already have an account?{" "}
                </p>
                <Link to="/login">
                  <button className="btn btn-outline-dark rounded-pill px-4 border-0">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoginPage && (
        <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 me-3">
          <p className="m-0">Don't have an account? </p>
          <Link to="/login">
            <button className="btn btn-outline-dark rounded-pill px-4 border-0">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
