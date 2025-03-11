import "bootstrap-icons/font/bootstrap-icons.css";

import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna

  // Fungsi untuk memeriksa apakah pengguna sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token untuk mendapatkan informasi pengguna
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken); // Simpan informasi pengguna ke state
    }
  }, []);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    setUser(null); // Reset state pengguna
    navigate("/login"); // Arahkan pengguna ke halaman login
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

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

        {/* Jika bukan halaman login atau register, tampilkan tombol toggle untuk menu */}
        {!isAuthPage && (
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

        {/* Menu Navbar dengan Offcanvas untuk Mobile, hanya ditampilkan jika bukan halaman login/register */}
        {!isAuthPage && (
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

            <div className="offcanvas-body align-items-center">
              <ul className="navbar-nav mx-auto fw-bold text-center nav-list">
                <li className="nav-item">
                  <NavLink to={"/"} className="nav-link position-relative px-3">
                    <span className="position-relative">Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/about"}
                    className="nav-link position-relative px-3 nav-link-active"
                    activeClassName="active"
                    exact
                  >
                    <span className="position-relative">About Us</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/Leaderboard"}
                    className="nav-link position-relative px-3"
                  >
                    <span className="position-relative">Leaderboard</span>
                  </NavLink>
                </li>
              </ul>

              {/* Tampilkan nama pengguna dan tombol logout jika sudah login */}
              {user ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <div className="dropdown">
                    <img
                      width={55}
                      className="rounded-circle mx-md-2 text-center"
                      src="../assets/user.png"
                      alt=""
                    />
                    <button
                      className="btn fw-semibold dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.fullName}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-light">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-person-fill"></i> Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-gear"></i> Setting
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right"></i> Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <p className="m-0 d-none d-sm-block">
                    Already have an account?{" "}
                  </p>
                  <Link to="/login">
                    <button className="btn btn-outline-dark rounded-pill px-4 border-0">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
