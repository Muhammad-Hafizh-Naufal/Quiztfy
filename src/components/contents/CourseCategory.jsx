import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../../services/service";
import Loading from "../Loading";
import "../../../src/App.css"; // Pastikan path ini benar

export default function CourseCategory() {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        // Simulasi penundaan untuk melihat efek loading
        // await new Promise(resolve => setTimeout(resolve, 1500));
        const data = await service.getMateriById(id); // Pastikan fungsi ini ada di service Anda
        setMateri(data);
        setQuiz(data.quiz);
      } catch (error) {
        console.error("Error fetching materi:", error);
        // Anda mungkin ingin menampilkan pesan error di UI juga
        setMateri(false); // Set ke false atau state error khusus untuk menangani UI error
      }
    };

    fetchMateri();
  }, [id]);

  // Bagian Loading dengan animasi dan min-vh-100
  if (materi === null) {
    // materi masih null, artinya sedang loading
    return (
      <div className="min-vh-100 full-page-bg d-flex flex-column justify-content-center align-items-center">
        <Loading show={true} />
      </div>
    );
  }

  // Bagian jika terjadi error saat fetch data (opsional, tergantung bagaimana Anda ingin menangani error)
  if (materi === false) {
    return (
      <div className="min-vh-100 full-page-bg d-flex flex-column justify-content-center align-items-center">
        <p className="text-center my-5 text-danger">
          Gagal memuat materi. Silakan coba lagi nanti.
        </p>
        <Link to="/dashboard" className="btn btn-warning">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  // Bagian Konten Utama setelah data dimuat
  return (
    <div className="min-vh-100 full-page-bg">
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

      <section className="container my-5">
        <div className="row justify-content-center g-4">
          {/* Card Materi */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 rounded-4 border-0 shadow-sm">
              <div className="text-center p-4">
                <img
                  src="/assets/category/Materi.png" // Pastikan path ini benar
                  className="img-fluid"
                  alt="Materi Icon"
                  style={{ maxWidth: "120px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold mb-3">
                  <Link
                    to={`/materi/${id}`}
                    className="text-decoration-none text-dark"
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
            <div className="card h-100 rounded-4 border-0 shadow-sm">
              <div className="text-center p-4">
                <img
                  src="/assets/category/Quiz.png" // Pastikan path ini benar
                  className="img-fluid"
                  alt="Quiz Icon"
                  style={{ maxWidth: "120px" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center fw-semibold mb-3">
                  <Link
                    // Pastikan quiz tidak null sebelum mengakses id-nya
                    to={quiz ? `/quiz/${quiz.id}` : "#"}
                    className={`text-decoration-none ${
                      quiz ? "text-dark" : "text-muted pe-none"
                    }`} // nonaktifkan link jika quiz tidak ada
                    aria-disabled={!quiz}
                    tabIndex={!quiz ? -1 : undefined}
                  >
                    Quiz
                  </Link>
                </h5>
                <p className="card-text text-center text-muted">
                  {quiz?.description || "Quiz belum tersedia."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
