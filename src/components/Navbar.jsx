import { Link, useLocation, useNavigate } from "react-router-dom";
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

            <div className="offcanvas-body">
              <ul className="navbar-nav mx-auto fw-bold text-center nav-list">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link position-relative px-3">
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
                    to={"/Leaderboard"}
                    className="nav-link position-relative px-3"
                  >
                    <span className="position-relative">Leaderboard</span>
                  </Link>
                </li>
              </ul>

              {/* Tampilkan nama pengguna dan tombol logout jika sudah login */}
              {user ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <p className="m-0">Welcome, {user.fullName}</p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger rounded-pill px-4"
                  >
                    Logout
                  </button>
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

        {/* Tombol navigasi untuk halaman Login/Register */}
        {isAuthPage && (
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 me-3">
            {location.pathname === "/register" && (
              <>
                <p className="m-0">Already have an account? </p>
                <Link to="/login">
                  <button className="btn btn-outline-dark rounded-pill px-4 border-0">
                    Login
                  </button>
                </Link>
              </>
            )}
            {location.pathname === "/login" && (
              <>
                <p className="m-0">Don't have an account? </p>
                <Link to="/register">
                  <button className="btn btn-outline-dark rounded-pill px-4 border-0">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
