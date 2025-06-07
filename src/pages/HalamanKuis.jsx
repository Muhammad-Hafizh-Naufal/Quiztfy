import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Modal } from "react-bootstrap";
import Loading from "../components/Loading"; // Pastikan komponen ini ada
import Navbar from "../components/Navbar"; // Pastikan komponen ini ada
import Footer from "../components/Footer"; // Pastikan komponen ini ada
import service from "../services/service"; // Pastikan service ini benar

export default function HalamanKuisGabungan() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // State untuk mengelola data dan UI kuis
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [timer, setTimer] = useState(30);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Mengambil data kuis saat komponen dimuat
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await service.getQuizById(quizId);

        // Memastikan data kuis dan pertanyaan ada
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error(
            "Kuis ini tidak memiliki pertanyaan atau data tidak valid."
          );
        }

        // Mem-parsing 'options' dari string JSON menjadi array
        const processedQuestions = data.questions.map((q) => ({
          ...q,
          options: Array.isArray(q.options)
            ? q.options
            : JSON.parse(q.options || "[]"),
        }));

        setQuiz({ ...data, questions: processedQuestions });
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError(err.message || "Gagal memuat kuis. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  // Mengelola timer untuk setiap pertanyaan
  useEffect(() => {
    let timerId;
    if (quizStarted && !showScore && timer > 0) {
      timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleAnswerSelect(null); // Pindah ke pertanyaan selanjutnya jika waktu habis
    }
    return () => clearInterval(timerId);
  }, [timer, quizStarted, showScore]);

  // Fungsi untuk memulai kuis
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimer(30); // Atur ulang timer saat kuis dimulai
  };

  // Fungsi yang dijalankan saat pengguna memilih jawaban
  const handleAnswerSelect = (selectedOption) => {
    if (selectedAnswer !== null) return; // Mencegah klik ganda

    setSelectedAnswer(selectedOption);
    const currentQ = quiz.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswer = {
      question: currentQ.question,
      userAnswer: selectedOption,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation,
    };
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    // Memberi jeda sebelum ke pertanyaan berikutnya
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30); // Reset timer
        setSelectedAnswer(null); // Reset pilihan jawaban
      } else {
        setShowScore(true);
        submitQuizResult(updatedAnswers, isCorrect ? score + 1 : score);
      }
    }); // Jeda 1.5 detik
  };

  // Mengirim hasil kuis ke server (opsional, tergantung backend)
  const submitQuizResult = async (answers, score) => {
    setIsSubmitting(true);
    try {
      // Format answers to match backend expectation
      const formattedAnswers = answers.map((ans, index) => ({
        questionId: quiz.questions[index].id, // Use the question ID from the quiz data
        answer: ans.userAnswer,
      }));

      await service.submitQuizResult(quizId, formattedAnswers, score);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
      setError("Gagal menyimpan hasil kuis. Silakan coba lagi.");
      setQuizSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mengatur ulang state untuk mengulang kuis
  const handleRetryQuiz = () => {
    setQuizStarted(false);
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  // Menampilkan dan menyembunyikan modal review
  const handleShowReview = () => setShowReview(true);
  const handleCloseReview = () => setShowReview(false);

  // Tampilan Loading
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading show={true} />
      </div>
    );
  }

  // Tampilan Error
  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Alert variant="danger">
              <h4>Oops! Terjadi Kesalahan</h4>
              <p>{error}</p>
            </Alert>
            <Button variant="primary" onClick={() => navigate(-1)}>
              Kembali
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Jika quiz tidak ditemukan
  if (!quiz) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Alert variant="warning">
              <h4>Kuis Tidak Ditemukan</h4>
              <p>Maaf, kuis yang Anda cari tidak tersedia.</p>
            </Alert>
            <Button variant="primary" onClick={() => navigate("/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Tampilan Utama Kuis
  return (
    <div className="quiz-page min-vh-100 d-flex flex-column">
      <Navbar />
      {/* Title Header */}
      <div className="d-flex text-center p-5 align-items-center justify-content-center position-relative">
        <Link
          to={`/course/${quiz.id}`}
          className="d-none d-md-block position-absolute start-0 ms-5"
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
        <h1>{quiz.title}</h1>
      </div>

      <div className="container flex-grow-1 pb-5 min-vh-100">
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <Card.Body className="p-sm-5 p-4">
            {showScore ? (
              // Tampilan Skor Akhir
              <div className="text-center">
                <h3>
                  Skor Akhir Anda: {score} dari {quiz.questions.length}
                </h3>
                <p>
                  {isSubmitting
                    ? "Menyimpan Hasil Kuis..."
                    : quizSubmitted
                    ? "Hasil kuis berhasil disimpan."
                    : "Gagal menyimpan hasil kuis."}
                </p>
                <Button
                  variant="success"
                  onClick={handleRetryQuiz}
                  className="me-2 mt-2"
                >
                  Ulangi Kuis
                </Button>
                <Button
                  variant="info"
                  onClick={handleShowReview}
                  className="mt-2"
                >
                  Lihat Jawaban
                </Button>
              </div>
            ) : quizStarted ? (
              // Tampilan Pertanyaan
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    Pertanyaan {currentQuestion + 1}/{quiz.questions.length}
                  </h5>
                  <span className="badge bg-danger rounded-pill fs-6">
                    Sisa Waktu: {timer}s
                  </span>
                </div>
                <h4 className="mb-4">
                  {quiz.questions[currentQuestion].question}
                </h4>
                <div className="d-grid gap-2">
                  {quiz.questions[currentQuestion].options.map((opt, idx) => {
                    const isSelected = selectedAnswer === opt;
                    let variant = "outline-secondary";
                    if (selectedAnswer !== null) {
                      if (
                        opt === quiz.questions[currentQuestion].correctAnswer
                      ) {
                        variant = "success"; // Jawaban benar
                      } else if (isSelected) {
                        variant = "danger"; // Jawaban salah
                      }
                    }

                    return (
                      <Button
                        key={idx}
                        variant={variant}
                        onClick={() => handleAnswerSelect(opt)}
                        disabled={selectedAnswer !== null}
                        size="lg"
                        className="text-start"
                      >
                        {opt}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Tampilan Awal Kuis
              <div className="text-center">
                <img
                  src={quiz.img}
                  alt={quiz.title}
                  className="img-fluid rounded mb-4"
                  style={{ maxHeight: "300px" }}
                />
                <h4>Tentang Kuis Ini</h4>
                <p>{quiz.description}</p>
                <p>Jumlah Pertanyaan: {quiz.questions.length}</p>
                <Button variant="primary" size="lg" onClick={handleStartQuiz}>
                  Mulai Kuis
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <Footer />

      {/* Modal untuk Review Jawaban */}
      <Modal show={showReview} onHide={handleCloseReview} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Jawaban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group list-group-flush">
            {userAnswers.map((ans, idx) => (
              <li key={idx} className="list-group-item px-0">
                <strong>
                  P{idx + 1}: {ans.question}
                </strong>
                <p
                  className={`mb-1 ${
                    ans.isCorrect ? "text-success" : "text-danger"
                  }`}
                >
                  Jawaban Anda: {ans.userAnswer || "Tidak dijawab"}{" "}
                  {ans.isCorrect ? "✔" : "✖"}
                </p>
                {!ans.isCorrect && (
                  <p className="mb-1 text-success">
                    Kunci Jawaban: {ans.correctAnswer}
                  </p>
                )}
                {ans.explanation && (
                  <p className="mb-0 text-muted fst-italic">
                    Penjelasan: {ans.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReview}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
