import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import course from "../../data/course.json";

function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const selectedCourse = course.find(
    (item) => item.name.toLowerCase().replace(/\s/g, "-") === category
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedAnswers([...selectedAnswers, option]);
    if (option === selectedCourse.quiz[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < selectedCourse.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate(`/score?score=${score + 1}`);
    }
  };

  return (
    <div className="container mt-5">
      {score === null ? (
        <div>
          <h3>{selectedCourse.quiz[currentQuestion].question}</h3>
          <div className="list-group">
            {selectedCourse.quiz[currentQuestion].options.map(
              (option, index) => (
                <button
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Quiz;
