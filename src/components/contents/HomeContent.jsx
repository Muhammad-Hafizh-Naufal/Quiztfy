import { Link, useNavigate } from "react-router-dom";
// import course from "../../data/course.json";
import service from "../../services/service";
import "../../../src/App.css";
import { useState, useEffect } from "react";

export default function Content() {
  const [course, setCourse] = useState([]);

  const navigate = useNavigate();

  const handleStartQuiz = (categoryName) => {
    navigate(`/quiz/${categoryName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAllQuiz();
        setCourse(data);
      } catch (error) {
        const err = error;
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-2 pt-md-5 min-vh-100 full-page-bg">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="mb-3">Personalize Your Quiz Experience</h1>
        <p className="text-muted">
          Choose your topics and materials to create a customized learning path
          that suits your interests and expertise
        </p>
      </div>

      {/* Cards Container */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {course.map((category, index) => (
          // Single Card
          <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 rounded-4 border-0 shadow-sm">
              {/* <div className="text-center bg-light p-4 rounded-top-4">
                <img
                  src={category.img}
                  className="card-img-top"
                  alt={`${category.name} Icon`}
                  style={{ maxWidth: "120px" }}
                />
              </div> */}
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-3">
                  <Link
                    onClick={() => handleStartQuiz(category.title)}
                    className="text-decoration-none text-dark"
                  >
                    {category.title}
                  </Link>
                </h5>
                <p className="card-text text-muted">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
