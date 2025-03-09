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

            <div className="offcanvas-body align-items-center">
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
                  {/* <p className="m-0">Welcome, {user.fullName}</p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger rounded-pill px-4"
                  >
                    Logout
                  </button> */}

                  <div className="dropdown ">
                    <img
                      width={55}
                      className="rounded-circle mx-md-2"
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                    <button
                      className="btn   dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.fullName}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-light">
                      <li>
                        <a className="dropdown-item" href="#">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Setting
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-danger"
                          href="#"
                          onClick={handleLogout}
                        >
                          Log Out
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
