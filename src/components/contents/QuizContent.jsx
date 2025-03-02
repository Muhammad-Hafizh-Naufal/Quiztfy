import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../../service/service";

// Import components
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function QuizContent() {
  const { id } = useParams(); // Ambil ID quiz dari URL
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data quiz dari backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await service.getQuizById(id);
        setQuiz(response);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle jawaban pengguna
  const handleAnswerClick = async (selectedOption) => {
    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: quiz.questions[currentQuestion].id,
        answer: selectedOption,
      },
    ];
    setUserAnswers(updatedAnswers);

    // Jika ini adalah pertanyaan terakhir, kirim jawaban ke backend
    if (currentQuestion + 1 >= quiz.questions.length) {
      try {
        const response = await service.questionSubmit({
          quizId: quiz.id,
          userId: 1, // Ganti dengan ID pengguna yang login
          answers: updatedAnswers,
        });
        setScore(response.score);
        setShowScore(true);
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Memuat quiz...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-5">Quiz tidak ditemukan</div>;
  }

  const questions = quiz.questions;

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        {showScore ? (
          <ScoreDisplay score={score} totalQuestions={questions.length} />
        ) : (
          <QuestionDisplay
            question={questions[currentQuestion]}
            category={quiz.title}
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
  // Parse opsi dari string JSON ke array
  const options = JSON.parse(question.options);

  return (
    <div>
      <Navbar />
      <h2 className="h5 mb-4">
        {category}: {question.question}
      </h2>
      <div className="d-grid gap-3">
        {options.map((option, index) => (
          <button
            key={index}
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
