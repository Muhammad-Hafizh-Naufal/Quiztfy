import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  ProgressBar,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import service, { dummyQuizData } from "../services/service";

export default function HalamanKuis() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        let data;

        try {
          // Coba ambil dari API
          data = await service.getQuizById(id);

          // Format options jika masih berupa string JSON
          if (data.quiz && data.quiz.questions) {
            data.quiz.questions = data.quiz.questions.map((q) => ({
              ...q,
              options: Array.isArray(q.options)
                ? q.options
                : JSON.parse(q.options || "[]"),
            }));
          }
        } catch (apiError) {
          console.warn(
            "API not available, using dummy data:",
            apiError.message
          );
          // Jika API gagal, gunakan data dummy
          if (id == 1) {
            data = dummyQuizData;
          } else {
            throw new Error("Quiz tidak ditemukan");
          }
        }

        if (
          !data.quiz ||
          !data.quiz.questions ||
          data.quiz.questions.length === 0
        ) {
          throw new Error("Quiz tidak memiliki pertanyaan");
        }

        setQuiz(data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError(error.message || "Gagal memuat quiz");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  // Timer effect - hanya jalan jika quiz sudah dimulai
  useEffect(() => {
    if (!showScore && quiz && timer > 0 && !selectedAnswer && quizStarted) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0 && !selectedAnswer && quizStarted) {
      handleAnswerSelect(null);
    }
  }, [timer, showScore, quiz, selectedAnswer, quizStarted]);

  const handleAnswerSelect = async (selectedOption) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(selectedOption);
    const currentQ = quiz.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    // Simpan jawaban user
    const newAnswer = {
      questionId: currentQ.id,
      question: currentQ.question,
      userAnswer: selectedOption,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation,
      timeRemaining: timer,
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Delay sebelum pindah ke pertanyaan berikutnya
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
        submitQuizResult(updatedAnswers, isCorrect ? score + 1 : score);
      }
    }, 1500);
  };

  const submitQuizResult = async (answers, finalScore) => {
    try {
      await service.submitQuizResult(quiz.id, answers, finalScore);
      setQuizSubmitted(true);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
      // Still show results even if submission fails
      setQuizSubmitted(false);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowScore(false);
    setTimer(30);
    setQuizSubmitted(false);
    setSelectedAnswer(null);
    setQuizStarted(false); // Reset ke halaman instruksi
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimer(30);
  };

  const handleShowReview = () => {
    setShowReview(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Loading show={true} />
      </div>
    );
  }

  // Error state
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

  // Quiz not found
  if (!quiz) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Alert variant="warning">
              <h4>Quiz Tidak Ditemukan</h4>
              <p>Quiz yang Anda cari tidak tersedia.</p>
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

  return (
    <div className="quiz-page min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Header */}
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

      {/* Main Content */}
      <div className="container flex-grow-1 pb-5">
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            {showScore ? (
              <ScoreDisplay
                score={score}
                totalQuestions={quiz.questions.length}
                userAnswers={userAnswers}
                onRetry={handleRetryQuiz}
                onShowReview={handleShowReview}
                quizSubmitted={quizSubmitted}
                quizTitle={quiz.title}
              />
            ) : (
              <QuestionDisplay
                question={quiz.questions[currentQuestion]}
                currentQuestion={currentQuestion}
                totalQuestions={quiz.questions.length}
                timer={timer}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
              />
            )}
          </Card.Body>
        </Card>
      </div>

      <Footer />

      {/* Modal Review Jawaban */}
      <ReviewModal
        show={showReview}
        onHide={() => setShowReview(false)}
        userAnswers={userAnswers}
        quizTitle={quiz.title}
      />
    </div>
  );
}

// Component untuk menampilkan pertanyaan
function QuestionDisplay({
  question,
  currentQuestion,
  totalQuestions,
  timer,
  onAnswerSelect,
  selectedAnswer,
}) {
  const getOptionStyle = (option) => {
    if (selectedAnswer === null) return "";

    if (option === question.correctAnswer) {
      return "list-group-item-success border-success";
    } else if (option === selectedAnswer && option !== question.correctAnswer) {
      return "list-group-item-danger border-danger";
    }

    return "opacity-50";
  };

  return (
    <div>
      <ProgressBar
        now={((currentQuestion + 1) / totalQuestions) * 100}
        label={`${Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%`}
        className="mb-4"
        variant={timer <= 10 ? "danger" : "primary"}
      />

      <div className="mb-4 text-center">
        <h4 className="mb-3">{question.question}</h4>
        <div className="d-flex justify-content-center gap-3">
          <Badge bg="secondary">
            Pertanyaan {currentQuestion + 1} dari {totalQuestions}
          </Badge>
          <Badge bg={timer <= 10 ? "danger" : "primary"}>
            <i className="bi bi-clock me-1"></i>
            {timer}s
          </Badge>
        </div>
      </div>

      <ListGroup className="gap-2">
        {question.options.map((option, index) => (
          <ListGroup.Item
            key={index}
            action={selectedAnswer === null}
            onClick={() => selectedAnswer === null && onAnswerSelect(option)}
            className={`py-3 rounded-3 ${getOptionStyle(option)} ${
              selectedAnswer === null ? "cursor-pointer" : ""
            }`}
            style={{ cursor: selectedAnswer === null ? "pointer" : "default" }}
          >
            <div className="d-flex align-items-center">
              <span className="me-3 fw-bold">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{option}</span>
              {selectedAnswer !== null && option === question.correctAnswer && (
                <i className="bi bi-check-circle-fill text-success ms-auto"></i>
              )}
              {selectedAnswer === option &&
                option !== question.correctAnswer && (
                  <i className="bi bi-x-circle-fill text-danger ms-auto"></i>
                )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedAnswer !== null && (
        <div className="mt-3 text-center">
          <small className="text-muted">Menuju pertanyaan berikutnya...</small>
        </div>
      )}
    </div>
  );
}

// Component untuk menampilkan hasil
function ScoreDisplay({
  score,
  totalQuestions,
  userAnswers,
  onRetry,
  onShowReview,
  quizSubmitted,
  quizTitle,
}) {
  const navigate = useNavigate();
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "danger";
  };

  const getScoreMessage = () => {
    if (percentage === 100) return "Sempurna! 🎉";
    if (percentage >= 80) return "Excellent! 👏";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Learning! 📚";
  };

  return (
    <div className="text-center">
      <h1 className="display-6 fw-bold mb-4">Hasil Quiz</h1>
      <h5 className="text-muted mb-4">{quizTitle}</h5>

      <div className="mb-4">
        <div
          className={`mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow bg-${getScoreColor()}`}
          style={{ width: "150px", height: "150px" }}
        >
          <div>
            <h2 className="h3 mb-0 text-white">
              {score}/{totalQuestions}
            </h2>
            <p className="small mb-0 text-white">{percentage}%</p>
          </div>
        </div>
      </div>

      <p className="lead text-muted mb-4">{getScoreMessage()}</p>

      {/* Statistics */}
      <div className="row mb-4">
        <div className="col-4">
          <div className="text-center">
            <h5 className="text-success">{score}</h5>
            <small className="text-muted">Benar</small>
          </div>
        </div>
        <div className="col-4">
          <div className="text-center">
            <h5 className="text-danger">{totalQuestions - score}</h5>
            <small className="text-muted">Salah</small>
          </div>
        </div>
        <div className="col-4">
          <div className="text-center">
            <h5 className="text-primary">{totalQuestions}</h5>
            <small className="text-muted">Total</small>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/dashboard")}
        >
          <i className="bi bi-house-door me-2"></i>
          Dashboard
        </Button>
        <Button variant="outline-primary" size="lg" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Coba Lagi
        </Button>
        <Button variant="info" size="lg" onClick={onShowReview}>
          <i className="bi bi-eye me-2"></i>
          Review Jawaban
        </Button>
      </div>

      {/* Submission Status */}
      {quizSubmitted && (
        <Alert variant="success" className="mt-4">
          <i className="bi bi-check-circle me-2"></i>
          Hasil quiz Anda telah tersimpan!
        </Alert>
      )}

      {!quizSubmitted && (
        <Alert variant="warning" className="mt-4">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Hasil belum tersimpan. Periksa koneksi internet Anda.
        </Alert>
      )}
    </div>
  );
}

// Component Modal Review
function ReviewModal({ show, onHide, userAnswers, quizTitle }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-eye me-2"></i>
          Review Jawaban - {quizTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userAnswers.map((answer, index) => (
          <div key={index} className="mb-4 border-bottom pb-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="mb-0">Pertanyaan {index + 1}</h6>
              <Badge
                bg={answer.isCorrect ? "success" : "danger"}
                className="ms-2"
              >
                {answer.isCorrect ? (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    Benar
                  </>
                ) : (
                  <>
                    <i className="bi bi-x-circle me-1"></i>
                    Salah
                  </>
                )}
              </Badge>
            </div>

            <p className="mb-3">{answer.question}</p>

            <div className="mb-2">
              <strong>Jawaban Anda:</strong>{" "}
              <span
                className={answer.isCorrect ? "text-success" : "text-danger"}
              >
                {answer.userAnswer || "Tidak dijawab"}
              </span>
            </div>

            <div className="mb-2">
              <strong>Jawaban Benar:</strong>{" "}
              <span className="text-success">{answer.correctAnswer}</span>
            </div>

            <div className="text-muted">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                {answer.explanation}
              </small>
            </div>

            {answer.timeRemaining !== undefined && (
              <div className="text-muted mt-2">
                <small>
                  <i className="bi bi-clock me-1"></i>
                  Waktu tersisa: {answer.timeRemaining}s
                </small>
              </div>
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
