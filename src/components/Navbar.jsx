import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    }
  }, []);

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix untuk masalah scroll di mobile
  useEffect(() => {
    const offcanvasElement = document.getElementById("navbarOffcanvas");

    if (offcanvasElement) {
      const handleOffcanvasShow = () => {
        // Simpan posisi scroll saat ini
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
      };

      const handleOffcanvasHide = () => {
        // Restore posisi scroll
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      };

      // Event listeners untuk Bootstrap offcanvas
      offcanvasElement.addEventListener(
        "show.bs.offcanvas",
        handleOffcanvasShow
      );
      offcanvasElement.addEventListener(
        "hide.bs.offcanvas",
        handleOffcanvasHide
      );

      // Cleanup
      return () => {
        if (offcanvasElement) {
          offcanvasElement.removeEventListener(
            "show.bs.offcanvas",
            handleOffcanvasShow
          );
          offcanvasElement.removeEventListener(
            "hide.bs.offcanvas",
            handleOffcanvasHide
          );
        }
      };
    }
  }, []);

  // Fix scroll saat navigasi ke halaman baru
  useEffect(() => {
    // Reset scroll position dan body styles saat route berubah
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    // Tutup offcanvas jika masih terbuka saat navigasi
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);

    // Tutup offcanvas sebelum navigasi
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas =
        window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }

    navigate("/");
  };

  const handleNavClick = () => {
    // Tutup offcanvas saat navigasi
    const offcanvasElement = document.getElementById("navbarOffcanvas");
    if (offcanvasElement && window.innerWidth < 992) {
      // Hanya di mobile/tablet
      const bsOffcanvas =
        window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav
      className={`navbar shadow navbar-expand-lg rounded-bottom-5 sticky-top ${
        isAuthPage ? "bg-light" : scrolled ? "scrolled" : "navbar-transparent"
      }`}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center " href="/">
          <img
            src="/assets/LOGO FULL.png"
            alt="Logo"
            height="60"
            className="d-inline-block align-top me-2 "
          />
        </a>

        {!isAuthPage && (
          <button
            className="navbar-toggler  border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
            aria-controls="navbarOffcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
        )}

        {!isAuthPage && (
          <div
            className="offcanvas offcanvas-end"
            style={{ backgroundColor: "#f2a361" }}
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
                className="btn-close text-reset "
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body align-items-center">
              <ul className="navbar-nav mx-auto fw-bold text-center nav-list">
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className="nav-link position-relative px-3"
                    onClick={handleNavClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className="nav-link position-relative px-3"
                    onClick={handleNavClick}
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Leaderboard"
                    className="nav-link position-relative px-3"
                    onClick={handleNavClick}
                  >
                    Leaderboard
                  </NavLink>
                </li>
              </ul>

              {user ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  {/* Desktop dropdown - tampil hanya di layar besar */}
                  <div className="dropdown d-none d-lg-block">
                    <button
                      className="btn dropdown-toggle d-flex align-items-center gap-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="../assets/user.png"
                        alt="User"
                        width="35"
                        className="rounded-circle"
                      />
                      <span className="fw-semibold">{user.fullName}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <i className="bi bi-person-fill me-2"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i> Log Out
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Mobile/Tablet menu - tampil hanya di layar kecil/medium */}
                  <div className="d-lg-none w-100">
                    {/* Garis pemisah */}
                    <hr className="my-3 border-secondary" />

                    <div className="">
                      {/* User info */}
                      <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                        <img
                          src="../assets/user.png"
                          alt="User"
                          width="35"
                          className="rounded-circle"
                        />
                        <span className="fw-semibold">{user.fullName}</span>
                      </div>

                      {/* Menu items */}
                      <div className="d-flex flex-column gap-2 text-center ">
                        <NavLink
                          to="/profile"
                          className="btn btn-outline-primary w-100"
                          onClick={handleNavClick}
                        >
                          <i className="bi bi-person-fill me-2"></i> Profile
                        </NavLink>
                        <button
                          className="btn btn-outline-danger w-100"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Desktop login button */}
                  <div className="d-none d-lg-flex align-items-center gap-2 justify-content-center">
                    <p className="m-0 d-none d-sm-block">
                      Already have an account?
                    </p>
                    <Link to="/login">
                      <button className="btn btn-outline-warning rounded-pill px-4 border-0 shadow ">
                        <i className="bi bi-box-arrow-in-right me-2 "></i>
                        Login
                      </button>
                    </Link>
                  </div>

                  {/* Mobile/Tablet login */}
                  <div className="d-lg-none w-100">
                    <hr className="my-3 border-secondary" />
                    <div className="text-center">
                      <p className="mb-3">Already have an account?</p>
                      <Link to="/login">
                        <button
                          className="btn btn-outline-dark w-100"
                          onClick={handleNavClick}
                        >
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Login
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
