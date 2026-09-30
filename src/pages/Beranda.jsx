import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Beranda.css";
import { NavLink } from "react-router-dom";

export default function Beranda() {
  return (
    <div>
      <Navbar />
      <main className="min-vh-100 full-page-bg py-5">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-md-5 text-center p-5 bg-gradient rounded container-xl shadow-lg mb-5">
          <img
            src="../../assets/category/Materi.png"
            alt="Icon Materi"
            className="img-fluid"
            style={{ maxWidth: "250px" }}
          />
          <h1 className="fontG fw-bold py-5 display-3 animated-gradient-text">
            Tech Quiztify
          </h1>
        </div>

        {/* content 1 */}
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="fw-bold mb-4">
                Challenge Yourself, Learn More, Dominate the Leaderboard!
              </h1>
              <p className="mb-4 fs-5 text-secondary">
                Uji kemampuanmu dengan kuis interaktif, jelajahi materi
                pembelajaran, dan lihat siapa yang memimpin di papan peringkat.
                Asah pengetahuanmu setiap hari!
              </p>
              <NavLink
                to={"/dashboard"}
                className="btn btn-warning btn-lg px-4 py-3 fw-semibold shadow-sm rounded-pill"
              >
                <i className="bi bi-caret-right-fill me-2"></i> Start Now
              </NavLink>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="../../assets/todolist.png"
                alt="To Do List"
                className="img-fluid rounded todolist-img"
                style={{ maxHeight: "350px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* content 2 */}
        <section className="my-5 bg-white rounded-4 shadow p-0 overflow-hidden container">
          <div className="row g-0">
            {/* Kolom kiri */}
            <div
              className="col-12 col-md-3 d-flex flex-column justify-content-center align-items-center text-white text-center p-5 rounded-start-4"
              style={{ backgroundColor: "#F2A361" }}
            >
              <div className="fs-1 fw-bold mb-3 ">
                Choose
                <br />
                Your
                <br />
                Path
              </div>
              <div
                className="small fs-5 fw-normal w-100"
                style={{ maxWidth: "90%" }}
              >
                Explore learning materials, test your skills with quizzes, and
                climb the leaderboard.
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="col-12 col-md-8">
              {[
                {
                  icon: "../../assets/category/Materi.png",
                  title: "Learn & Explore",
                },
                {
                  icon: "../../assets/category/Quiz.png",
                  title: "Quiz & Compete",
                },
                {
                  icon: "../../assets/category/thropy.png",
                  title: "Top the Leaderboard",
                },
              ].map(({ icon, title }, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center gap-3 px-4 py-4 border-bottom border-dashed border-dark-subtle hover-card"
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9f9f9";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgb(0 0 0 / 0.1)";
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <img
                    src={icon}
                    width="100"
                    height="100"
                    className="img-fluid"
                    alt={`${title} icon`}
                    style={{
                      filter: "drop-shadow(0 1px 1px rgb(0 0 0 / 0.1))",
                    }}
                  />
                  <h3 className="fs-5 fw-semibold text-dark m-0">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
