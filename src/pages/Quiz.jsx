import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import categories from "../data/course.json";

// import styles
import "../../src/App.css";

// import components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function QuizContent() {
  const { categoryName } = useParams();
  const category = categories.find((cat) => cat.name === categoryName);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(60); // Timer for each question

  useEffect(() => {
    if (timer > 0 && !showScore) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      handleAnswerClick(null);
    }
  }, [timer, showScore]);

  if (!category) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          Materi tidak ditemukan
        </div>
      </div>
    );
  }

  const questions = category.quiz;

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    setTimer(60); // Reset timer for the next question
    if (currentQuestion + 1 >= questions.length) {
      setShowScore(true);
    }
  };

  return (
    <>
      <div className="quiz-page min-vh-100 d-flex flex-column ">
        <Navbar />
        <div className="d-flex text-center p-5 align-items-center justify-content-center">
          <Link
            className="  d-none d-md-block ms-md-5 position-absolute top-1 start-0 "
            to={"/"}
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
          <h1>{category.name}</h1>
        </div>
        <div className="container flex-grow-1 align-items-center justify-content-center pb-5 ">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              {showScore ? (
                <ScoreDisplay
                  score={score}
                  totalQuestions={questions.length}
                  category={category.name}
                />
              ) : (
                <QuestionDisplay
                  question={questions[currentQuestion]}
                  category={category.name}
                  onAnswerClick={handleAnswerClick}
                  currentQuestionIndex={currentQuestion}
                  totalQuestions={questions.length}
                  timer={timer}
                />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// Komponen untuk menampilkan skor
function ScoreDisplay({ score, totalQuestions, category }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getFeedback = () => {
    if (percentage === 100)
      return "Sempurna! Anda menguasai materi dengan baik.";
    if (percentage >= 80)
      return "Bagus! Anda sudah memahami materi dengan baik.";
    if (percentage >= 60) return "Cukup baik. Pertahankan dan tingkatkan lagi.";
    return "Anda perlu lebih banyak belajar. Jangan menyerah!";
  };

  return (
    <div className="text-center">
      <h1 className="display-6 fw-bold mb-4 ">Hasil Kuis {category}</h1>
      <div className="mb-4">
        <div
          className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: percentage >= 60 ? "#28a745" : "#dc3545",
            color: "white",
          }}
        >
          <div>
            <h2 className="h3 mb-0">
              {score}/{totalQuestions}
            </h2>
            <p className="small mb-0">{percentage}%</p>
          </div>
        </div>
      </div>
      <p className="lead text-muted mb-4">{getFeedback()}</p>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => window.location.reload()}
      >
        Ulangi Kuis
      </button>
    </div>
  );
}

// Komponen untuk menampilkan pertanyaan
function QuestionDisplay({
  question,
  onAnswerClick,
  currentQuestionIndex,
  totalQuestions,
  timer,
}) {
  return (
    <div>
      {/* Progress Indicator */}
      <div className="progress mb-3">
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
          aria-valuenow={currentQuestionIndex + 1}
          aria-valuemin="0"
          aria-valuemax={totalQuestions}
        ></div>
      </div>

      {/* Question Header */}
      <div className="mb-4 d-flex flex-column align-items-center">
        <p className="lead">{question.question}</p>
        <small className="text-muted">
          Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions} | Waktu
          tersisa: {timer} detik
        </small>
      </div>

      {/* Answer Options */}
      <div className="d-grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerClick(option)}
            className="btn btn-outline shadow-sm btn-lg py-2 px-3 text-start"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
