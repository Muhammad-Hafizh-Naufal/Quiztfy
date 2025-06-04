import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  ProgressBar,
  Modal,
  ListGroup,
} from "react-bootstrap";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HalamanKuis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [timer, setTimer] = useState(30);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Data dummy jika tidak menggunakan API
  const dummyQuiz = {
    id: 1,
    title: "Kuis Pengetahuan Umum",
    questions: [
      {
        id: 1,
        question: "Apa ibukota Indonesia?",
        options: JSON.stringify(["Jakarta", "Bandung", "Surabaya", "Medan"]),
        correctAnswer: "Jakarta",
        explanation: "Jakarta adalah ibukota Indonesia sejak tahun 1945.",
      },
      {
        id: 2,
        question: "2 + 2 x 2 = ?",
        options: JSON.stringify(["6", "8", "4", "10"]),
        correctAnswer: "6",
        explanation:
          "Perkalian dilakukan sebelum penjumlahan (2x2=4, lalu 2+4=6).",
      },
      {
        id: 3,
        question: "Planet terdekat dari matahari?",
        options: JSON.stringify(["Venus", "Mars", "Mercury", "Bumi"]),
        correctAnswer: "Mercury",
        explanation:
          "Mercury adalah planet terdekat dari matahari dalam tata surya kita.",
      },
    ],
  };

  useEffect(() => {
    // Simulasi fetching data
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        // Jika menggunakan API:
        // const data = await service.getQuizById(id);
        // setQuiz(data);

        // Untuk demo, menggunakan data dummy
        setTimeout(() => {
          setQuiz(dummyQuiz);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!showScore && quiz && timer > 0) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      handleAnswerSelect(null);
    }
  }, [timer, showScore, quiz]);

  const handleAnswerSelect = (selectedOption) => {
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
    };

    setUserAnswers([...userAnswers, newAnswer]);
    if (isCorrect) setScore(score + 1);

    // Cek apakah masih ada pertanyaan berikutnya
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
    } else {
      setShowScore(true);
      // Simulasi submit ke backend
      setTimeout(() => setQuizSubmitted(true), 1500);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowScore(false);
    setTimer(30);
    setQuizSubmitted(false);
  };

  if (loading) return <Loading show={loading} />;
  if (!quiz)
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">Quiz tidak ditemukan</div>
      </div>
    );

  return (
    <div className="quiz-page min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="d-flex text-center p-5 align-items-center justify-content-center position-relative">
        <Link
          to="/"
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

      <div className="container flex-grow-1 pb-5">
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            {showScore ? (
              <ScoreDisplay
                score={score}
                totalQuestions={quiz.questions.length}
                userAnswers={userAnswers}
                onRetry={handleRetryQuiz}
                quizSubmitted={quizSubmitted}
              />
            ) : (
              <QuestionDisplay
                question={quiz.questions[currentQuestion]}
                currentQuestion={currentQuestion}
                totalQuestions={quiz.questions.length}
                timer={timer}
                onAnswerSelect={handleAnswerSelect}
              />
            )}
          </Card.Body>
        </Card>
      </div>

      <Footer />

      {/* Modal Review Jawaban */}
      <Modal show={showReview} onHide={() => setShowReview(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Jawaban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userAnswers.map((answer, index) => (
            <div key={index} className="mb-4 border-bottom pb-3">
              <h5>
                {answer.question}
                <Badge
                  bg={answer.isCorrect ? "success" : "danger"}
                  className="ms-2"
                >
                  {answer.isCorrect ? "Benar" : "Salah"}
                </Badge>
              </h5>
              <p className="mb-1">
                Jawaban Anda:{" "}
                <strong>{answer.userAnswer || "Tidak dijawab"}</strong>
              </p>
              <p className="mb-1">
                Jawaban benar:{" "}
                <strong className="text-success">{answer.correctAnswer}</strong>
              </p>
              <p className="text-muted mt-2">
                <small>{answer.explanation}</small>
              </p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReview(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function QuestionDisplay({
  question,
  currentQuestion,
  totalQuestions,
  timer,
  onAnswerSelect,
}) {
  const options = JSON.parse(question.options);

  return (
    <div>
      <ProgressBar
        now={((currentQuestion + 1) / totalQuestions) * 100}
        label={`${Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%`}
        className="mb-3"
      />

      <div className="mb-4 text-center">
        <h4 className="mb-3">{question.question}</h4>
        <Badge bg="secondary">
          Pertanyaan {currentQuestion + 1} dari {totalQuestions} | Waktu:{" "}
          {timer}s
        </Badge>
      </div>

      <ListGroup className="gap-2">
        {options.map((option, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => onAnswerSelect(option)}
            className="py-3 rounded-3"
          >
            {option}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

function ScoreDisplay({
  score,
  totalQuestions,
  userAnswers,
  onRetry,
  quizSubmitted,
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="display-6 fw-bold mb-4">Hasil Kuis</h1>

      <div className="mb-4">
        <div
          className={`mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow 
                        ${percentage >= 60 ? "bg-success" : "bg-danger"}`}
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

      <p className="lead text-muted mb-4">
        {percentage === 100
          ? "Sempurna!"
          : percentage >= 80
          ? "Bagus!"
          : percentage >= 60
          ? "Cukup baik."
          : "Perlu belajar lagi."}
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" size="lg" onClick={() => navigate("/")}>
          Kembali
        </Button>
        <Button variant="outline-primary" size="lg" onClick={onRetry}>
          Coba Lagi
        </Button>
        <Button
          variant="info"
          size="lg"
          onClick={() => navigate("/review", { state: { userAnswers } })}
        >
          Review Jawaban
        </Button>
      </div>

      {quizSubmitted && (
        <div className="alert alert-success mt-4">
          Jawaban Anda telah tersimpan!
        </div>
      )}
    </div>
  );
}
