// src/pages/Review.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";

export default function ReviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userAnswers = state?.userAnswers || [];

  if (!userAnswers.length) {
    return (
      <div className="container text-center mt-5">
        <h2>Tidak ada jawaban untuk ditampilkan.</h2>
        <Button onClick={() => navigate("/")}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Review Jawaban</h2>
      {userAnswers.map((answer, index) => (
        <Card key={index} className="mb-4 shadow">
          <Card.Body>
            <Card.Title>
              {index + 1}. {answer.question}
              <Badge
                bg={answer.isCorrect ? "success" : "danger"}
                className="ms-2"
              >
                {answer.isCorrect ? "Benar" : "Salah"}
              </Badge>
            </Card.Title>
            <p className="mb-1">
              <strong>Jawaban Anda:</strong>{" "}
              {answer.userAnswer || <em>Tidak dijawab</em>}
            </p>
            <p className="mb-1">
              <strong>Jawaban Benar:</strong> {answer.correctAnswer}
            </p>
            <p className="text-muted mt-2">
              <small>{answer.explanation}</small>
            </p>
          </Card.Body>
        </Card>
      ))}
      <div className="text-center">
        <Button onClick={() => navigate("/")}>Kembali ke Home</Button>
      </div>
    </div>
  );
}
