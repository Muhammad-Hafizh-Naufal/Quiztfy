import { useState } from "react";
import { useParams } from "react-router-dom";
import categories from "../../data/course.json";

// import components
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function QuizContent() {
  const { categoryName } = useParams();
  const category = categories.find((cat) => cat.name === categoryName);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  if (!category) {
    return <div className="text-center mt-5">Materi tidak ditemukan</div>;
  }

  const questions = category.quiz;

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion + 1 >= questions.length) {
      setShowScore(true);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        {showScore ? (
          <ScoreDisplay score={score} totalQuestions={questions.length} />
        ) : (
          <QuestionDisplay
            question={questions[currentQuestion]}
            category={category.name}
            onAnswerClick={handleAnswerClick}
          />
        )}
      </div>
    </div>
  );
}

// Komponen untuk menampilkan skor
function ScoreDisplay({ score, totalQuestions }) {
  return (
    <div className="text-center">
      <h1 className="display-6 fw-bold mb-4">Hasil Kuis</h1>
      <p className="fs-5">
        Skor Anda: <span className="fw-semibold">{score}</span> dari{" "}
        <span className="fw-semibold">{totalQuestions}</span>
      </p>
    </div>
  );
}

// Komponen untuk menampilkan pertanyaan
function QuestionDisplay({ question, category, onAnswerClick }) {
  return (
    <div>
      <Navbar />
      <h2 className="h5 mb-4">
        {category}: {question.question}
      </h2>
      <div className="d-grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerClick(option)}
            className="btn btn-primary"
          >
            {option}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
