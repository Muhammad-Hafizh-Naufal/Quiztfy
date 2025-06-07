import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/service";

const QuizDetail = () => {
  const { quizId } = useParams(); // Ambil dari URL
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await service.getQuizById(quizId);
        console.log("Data quiz berhasil didapat:", data);
        setQuiz(data);
      } catch (error) {
        console.error("Gagal mengambil data quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) return <p>Memuat kuis...</p>;
  if (!quiz) return <p>Data kuis tidak tersedia.</p>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <img
        src={quiz.img}
        alt={quiz.title}
        style={{ width: "100%", maxWidth: 600 }}
      />
      <p>{quiz.description}</p>
      <h3>Pertanyaan:</h3>
      <ul>
        {quiz.questions.map((q) => (
          <li key={q.id}>
            <strong>{q.question}</strong>
            <ul>
              {JSON.parse(q.options).map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDetail;
