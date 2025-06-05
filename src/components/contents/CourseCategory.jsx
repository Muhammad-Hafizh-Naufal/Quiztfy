import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../../services/service";
import Loading from "../Loading";
import "../../../src/App.css";

export default function CourseCategory() {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const data = await service.getMateriById(id);
        setMateri(data);
        setQuiz(data.quiz);
      } catch (error) {
        console.error("Error fetching materi:", error);
        setError("Gagal memuat data materi");
        setMateri(false);
      }
    };

    fetchMateri();
  }, [id]);

  // Loading state
  if (materi === null) {
    return (
      <div className="min-vh-100 full-page-bg d-flex flex-column justify-content-center align-items-center">
        <Loading show={true} />
      </div>
    );
  }

  // Error state
  if (materi === false) {
    return (
      <div className="min-vh-100 full-page-bg d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <div className="alert alert-danger">
            <h4>Oops! Terjadi Kesalahan</h4>
            <p>{error || "Gagal memuat materi. Silakan coba lagi nanti."}</p>
          </div>
          <Link to="/dashboard" className="btn btn-warning">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 full-page-bg">
      {/* Header dengan tombol kembali */}
      <div className="d-flex text-center p-5 align-items-center justify-content-center position-relative">
        <Link
          className="p-2 d-none d-md-block position-absolute top-0 start-0 ms-4 mt-3"
          to="/dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill text-warning"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </Link>
        <h1 className="mx-auto">{materi.title}</h1>
      </div>

      {/* Konten utama */}
      <section className="container my-5">
        <div className="row justify-content-center g-4">
          {/* Card Materi */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 rounded-4 border-0 shadow-sm hover-lift">
              <div className="text-center p-4">
                <img
                  src="/assets/category/Materi.png"
                  className="img-fluid"
                  alt="Materi Icon"
                  style={{ maxWidth: "120px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold mb-3">
                  <Link
                    to={`/materi/${id}`}
                    className="text-decoration-none text-dark stretched-link"
                  >
                    Materi
                  </Link>
                </h5>
                <p className="card-text text-center text-muted">
                  {materi.content || "Tidak ada deskripsi materi."}
                </p>
              </div>
            </div>
          </div>

          {/* Card Quiz */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className={`card h-100 rounded-4 border-0 shadow-sm ${
                quiz ? "hover-lift" : "opacity-75"
              }`}
            >
              <div className="text-center p-4">
                <img
                  src="/assets/category/Quiz.png"
                  className="img-fluid"
                  alt="Quiz Icon"
                  style={{ maxWidth: "120px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold mb-3">
                  {quiz ? (
                    <Link
                      to={`/kuis/${quiz.id}`}
                      className="text-decoration-none text-dark stretched-link"
                    >
                      Quiz
                    </Link>
                  ) : (
                    <span className="text-muted">Quiz</span>
                  )}
                </h5>
                <p className="card-text text-center text-muted">
                  {quiz?.description || "Quiz belum tersedia."}
                </p>
                {quiz && (
                  <div className="text-center">
                    <small className="text-success">
                      <i className="bi bi-check-circle me-1"></i>
                      {quiz.questions?.length || 0} Pertanyaan
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info tambahan jika quiz tersedia */}
        {quiz && (
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8">
              <div className="alert alert-info">
                <h5 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>
                  Tentang Quiz: {quiz.title}
                </h5>
                <p className="mb-2">{quiz.description}</p>
                <hr />
                <p className="mb-0">
                  <strong>Jumlah Pertanyaan:</strong>{" "}
                  {quiz.questions?.length || 0} soal
                  <br />
                  <strong>Waktu per Pertanyaan:</strong> 30 detik
                  <br />
                  <strong>Passing Score:</strong> 60%
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
