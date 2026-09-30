import { Link, useNavigate } from "react-router-dom";
// import course from "../../data/course.json";
import service from "../../services/service";
import "../../../src/App.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../styles/Dashboard.css";

export default function HomeContent() {
  const [course, setCourse] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const navigate = useNavigate();

  const courseHandler = (id) => {
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAllMateri();
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
          className="d-flex bg-dark flex-column flex-md-row align-items-center justify-content-center gap-md-5 text-center p-5 bg-gradient rounded container-xl shadow-lg mb-5"
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
          <h1 className="mb-3 ">Personalize Your Quiz Experience</h1>
          <p className="text-muted">
            Choose your topics and materials to create a customized learning
            path that suits your interests and expertise
          </p>
        </motion.div>

        {/* Cards Container */}
        {isDataFetched && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="container d-flex flex-column flex-md-row justify-content-center gap-5"
          >
            {course.map((materials, index) => (
              <motion.div variants={cardVariants} key={index} className="">
                <Link
                  onClick={() => courseHandler(materials.id)}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex  card card-custom border-0 h-100 shadow-sm">
                    <div className="bg-light text-center p-4">
                      <img
                        src={materials.imgUrl}
                        className="img-fluid"
                        alt={materials.title}
                        style={{ maxHeight: "120px" }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">{materials.title}</h5>
                      <p className="card-text text-muted">
                        {materials.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
