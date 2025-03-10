import { Link, useNavigate } from "react-router-dom";
// import course from "../../data/course.json";
import service from "../../services/service";
import "../../../src/App.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Content() {
  const [course, setCourse] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const navigate = useNavigate();

  const handleStartQuiz = (categoryName) => {
    navigate(`/quiz/${categoryName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAllQuiz();
        setCourse(data);
        setIsDataFetched(true);
      } catch (error) {
        const err = error;
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay antar kartu
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // const fadeIn = {
  //   hidden: { opacity: 0 },
  //   show: { opacity: 1, y: 0, transition: { duration: 1 } },
  // };

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  return (
    <>
      <div className="pt-2 pt-md-5 min-vh-100 full-page-bg">
        {/* Header Section */}

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className=" d-flex flex-column flex-md-row align-items-center justify-content-center gap-md-5 text-center p-5 bg-dark mb-5  rounded container"
        >
          <img src="../../assets/category/Materi.png" alt="" />
          <h1 className="fontG fw-bold py-5 display-3 animated-gradient-text">
            Tech Quiztify
          </h1>
        </motion.div>

        {/* title Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h1 className="mb-3">Personalize Your Quiz Experience</h1>
          <p className="text-muted">
            Choose your topics and materials to create a customized learning
            path that suits your interests and expertise
          </p>
        </motion.div>

        {/* Cards Container */}
        {isDataFetched && ( // Hanya render animasi jika data sudah di-fetch
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="d-flex flex-wrap justify-content-center gap-3"
          >
            {course.map((category, index) => (
              // Single Card
              <motion.div
                variants={cardVariants}
                key={index}
                className="col-12 col-md-6 col-lg-3 mb-4"
              >
                <div className="card h-100 rounded-4 border-0 shadow-sm">
                  <div className="text-center bg-light p-4 rounded-top-4">
                    <img
                      src={category.img}
                      className="card-img-top"
                      alt={`${category.name} Icon`}
                      style={{ maxWidth: "120px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-3">
                      <Link
                        onClick={() => handleStartQuiz(category.id)}
                        className="text-decoration-none text-dark"
                      >
                        {category.title}
                      </Link>
                    </h5>
                    <p className="card-text text-muted">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
