import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { NavLink } from "react-router-dom";

export default function Beranda() {
  return (
    <div>
      <Navbar />
      <main className="min-vh-100 full-page-bg ">
        <div className=" d-flex flex-column flex-md-row align-items-center justify-content-center gap-md-5 text-center p-5 bg-dark my-5   rounded container-xl">
          <img src="../../assets/category/Materi.png" alt="" />
          <h1 className="fontG fw-bold py-5 display-3 animated-gradient-text">
            Tech Quiztify
          </h1>
        </div>
        {/* content 1 */}
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="fw-bold">
                Challenge Yourself, Learn More, Dominate the Leaderboard!
              </h1>
              <p>
                Test your skills with interactive quizzes, explore learning
                materials, and see who tops the leaderboard. Sharpen your
                knowledge every day!
              </p>
              <NavLink to={"/dashboard"} className="btn btn-primary">
                <i className="bi bi-caret-right-fill "></i> Start Now
              </NavLink>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="../../assets/todolist.png"
                alt="To Do List"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        {/* content 2 */}

        <section className="my-5 bg-white rounded-4 shadow p-0 overflow-hidden container">
          <div className="row g-0">
            {/* Kolom kiri */}
            <div
              className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center text-white text-center p-4 rounded-start-4"
              style={{ backgroundColor: "#F2A361" }}
            >
              <div className="fs-4 fw-semibold mb-2">
                Choose
                <br />
                Your
                <br />
                Path
              </div>
              <div
                className="small fw-normal w-100"
                style={{ maxWidth: "90%" }}
              >
                Explore learning materials, test your skills with quizzes, and
                climb the leaderboard.
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="col-12 col-md-8">
              <div className="border-bottom border-dashed border-dark-subtle d-flex align-items-center gap-3 px-4 py-3">
                <img
                  src="../../assets/category/Materi.png"
                  width="100"
                  height="100"
                  className="img-fluid"
                  alt="Light bulb and book icon"
                />
                <h3 className="fs-6 fw-semibold text-dark m-0">
                  Learn & Explore
                </h3>
              </div>
              <div className="border-bottom border-dashed border-dark-subtle d-flex align-items-center gap-3 px-4 py-3">
                <img
                  src="../../assets/category/Quiz.png"
                  width="100"
                  height="100"
                  className="img-fluid"
                  alt="Question mark and book icon"
                />
                <h3 className="fs-6 fw-semibold text-dark m-0">
                  Quiz & Compete
                </h3>
              </div>
              <div className="d-flex align-items-center gap-3 px-4 py-3">
                <img
                  src="../../assets/category/thropy.png"
                  width="100"
                  height="100"
                  className="img-fluid"
                  alt="Trophies icon"
                />
                <h3 className="fs-6 fw-semibold text-dark m-0">
                  Top the Leaderboard
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
