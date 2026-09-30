/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import api from "./api";

function optionsOf(value) {
  let parsed = value;
  for (let i = 0; i < 2 && typeof parsed === "string"; i++)
    parsed = JSON.parse(parsed);
  if (
    !Array.isArray(parsed) ||
    !parsed.every((option) => typeof option === "string")
  )
    throw new Error("Format pilihan kuis belum valid.");
  return parsed;
}
export default function Quiz() {
  const { id } = useParams();
  return <QuizAttempt key={id} id={id} />;
}
function QuizAttempt({ id }) {
  const [quiz, setQuiz] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [revision, setRevision] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [remaining, setRemaining] = useState(60);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);
  const lock = useRef(false);
  const deadline = useRef(0);

  useEffect(() => {
    let active = true;
    setLoadError("");
    setQuiz(null);
    api
      .get(`/quiz/${id}`)
      .then((data) => {
        if (!data.questions?.length)
          throw new Error("Kuis ini belum memiliki soal.");
        const questions = data.questions.map((question) => ({
          ...question,
          options: optionsOf(question.options),
        }));
        if (active) {
          setQuiz({ ...data, questions });
          deadline.current = Date.now() + 60000;
        }
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      });
    return () => {
      active = false;
    };
  }, [id, revision]);

  const advance = useCallback(
    (answer) => {
      if (lock.current || !quiz || complete) return;
      lock.current = true;
      setAnswers((previous) => [
        ...previous,
        { questionId: quiz.questions[index].id, answer: answer ?? "" },
      ]);
      if (index + 1 === quiz.questions.length) setComplete(true);
      else {
        deadline.current = Date.now() + 60000;
        setIndex((previous) => previous + 1);
        setSelected(null);
        setRemaining(60);
      }
    },
    [quiz, index, complete],
  );

  useEffect(() => {
    lock.current = false;
  }, [index]);
  useEffect(() => {
    if (!quiz || complete) return;
    const tick = () => {
      const seconds = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(seconds);
      if (seconds === 0) advance("");
    };
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [quiz, complete, advance]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      setResult(
        await api.post("/quiz/submit", { quizId: Number(id), answers }),
      );
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }, [id, answers]);
  useEffect(() => {
    if (complete) submit();
  }, [complete, submit]);

  useEffect(() => {
    if (!quiz || result) return;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [quiz, result]);

  if (loadError)
    return (
      <div className="container empty-page">
        <h1>Tantangan belum bisa dibuka.</h1>
        <p role="alert">{loadError}</p>
        <button className="button" onClick={() => setRevision((v) => v + 1)}>
          Coba lagi
        </button>
      </div>
    );
  if (!quiz)
    return (
      <div className="container notice" role="status">
        <span className="spinner" />
        Menyiapkan soal…
      </div>
    );
  if (result) {
    const correct = result.results.filter((item) => item.isCorrect).length;
    const percentage = Math.round((correct / result.totalQuestions) * 100);
    return (
      <div className="container result-page">
        <p className="eyebrow">CHALLENGE COMPLETE / {quiz.title}</p>
        <div className="result-medal">
          <Trophy size={48} strokeWidth={1.4} />
        </div>
        <h1>
          {percentage === 100
            ? "Satu ronde. Sempurna."
            : percentage >= 60
              ? "Rasa penasaranmu terbayar."
              : "Satu langkah lebih tahu."}
        </h1>
        <p>Setiap percobaan punya pelajaran. Ini hasil tantanganmu.</p>
        {result.awardedScore === 0 && result.score > 0 && (
          <p>
            Kuis ini sudah pernah diselesaikan. Latihan ulang tidak menambah
            poin peringkat.
          </p>
        )}
        <div className="result-stats">
          <div>
            <strong>{result.awardedScore ?? result.score}</strong>
            <span>poin diperoleh</span>
          </div>
          <div>
            <strong>
              {correct}/{result.totalQuestions}
            </strong>
            <span>jawaban benar</span>
          </div>
          <div>
            <strong>{percentage}%</strong>
            <span>akurasi</span>
          </div>
        </div>
        <div className="result-actions">
          <Link className="button" to="/course">
            Tantangan berikutnya <ArrowRight size={19} />
          </Link>
          <Link className="button secondary" to="/leaderboard">
            Lihat peringkat
          </Link>
        </div>
        <section className="review">
          <p className="eyebrow">CATATAN UNTUK PERCOBAAN BERIKUTNYA</p>
          <h2>Lihat kembali jawabanmu.</h2>
          {result.results.map((item, i) => (
            <article key={item.questionId} className="review-item">
              <span
                className={
                  item.isCorrect ? "review-icon good" : "review-icon wrong"
                }
              >
                {item.isCorrect ? <Check size={19} /> : <X size={19} />}
              </span>
              <div>
                <h3>
                  {i + 1}.{" "}
                  {
                    quiz.questions.find((q) => q.id === item.questionId)
                      ?.question
                  }
                </h3>
                <p>
                  Jawabanmu: {item.userAnswer || "Waktu habis / tidak dijawab"}
                </p>
                {!item.isCorrect && (
                  <p className="correct-answer">
                    Jawaban benar: {item.correctAnswer}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  }
  if (complete)
    return (
      <div className="container empty-page">
        <p className="eyebrow">SATU RONDE SELESAI</p>
        <h1>{submitting ? "Menghitung hasilmu…" : "Hasil belum tersimpan."}</h1>
        {submitting ? (
          <span
            className="spinner"
            role="status"
            aria-label="Mengirim jawaban"
          />
        ) : (
          <>
            <p role="alert">{submitError}</p>
            <button className="button" onClick={submit}>
              <RotateCcw size={18} /> Kirim ulang jawaban
            </button>
          </>
        )}
      </div>
    );
  const question = quiz.questions[index];
  return (
    <div className="container quiz-page">
      <div className="quiz-topline">
        <Link
          className="text-link"
          to="/course"
          onClick={(e) => {
            if (
              !window.confirm(
                "Keluar dari kuis? Jawaban ronde ini belum disimpan.",
              )
            )
              e.preventDefault();
          }}
        >
          <ArrowLeft size={17} /> Keluar kuis
        </Link>
        <span className="eyebrow">{quiz.title}</span>
        <span
          className={`timer ${remaining <= 10 ? "urgent" : ""}`}
          role="timer"
          aria-label={`Sisa waktu ${remaining} detik`}
        >
          <Clock3 size={17} />{" "}
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </span>
      </div>
      <div
        className="quiz-progress"
        role="progressbar"
        aria-label="Kemajuan kuis"
        aria-valuenow={index + 1}
        aria-valuemin={0}
        aria-valuemax={quiz.questions.length}
      >
        <span
          style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>
      <section className="question-panel" key={question.id}>
        <p className="eyebrow">
          PERTANYAAN {String(index + 1).padStart(2, "0")}{" "}
          <span className="muted">
            / {String(quiz.questions.length).padStart(2, "0")}
          </span>
        </p>
        <h1 id="question-heading">{question.question}</h1>
        <p className="question-hint">Pilih satu jawaban yang paling tepat. Poin peringkat diberikan pada penyelesaian pertama kuis ini.</p>
        <div
          className="answer-list"
          role="group"
          aria-labelledby="question-heading"
        >
          {question.options.map((option, i) => (
            <button
              key={i}
              className={`answer-option ${selected === option ? "selected" : ""}`}
              aria-pressed={selected === option}
              onClick={() => setSelected(option)}
            >
              <span className="answer-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option}</span>
              {selected === option && <Check size={20} />}
            </button>
          ))}
        </div>
        <div className="question-footer">
          <span>
            <span className="live-dot" /> Satu pertanyaan lebih dekat.
          </span>
          <button
            className="button"
            disabled={selected === null}
            onClick={() => advance(selected)}
          >
            {index + 1 === quiz.questions.length
              ? "Selesaikan kuis"
              : "Jawab & lanjutkan"}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
