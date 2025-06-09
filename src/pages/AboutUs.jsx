import "../styles/Abt.css";
import "../../src/App.css";
import { motion } from "framer-motion"; // Impor Framer Motion

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

export default function AboutUs() {
  // Variasi animasi untuk container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Animasi anak-anak akan berurutan dengan delay 0.3 detik
      },
    },
  };

  // Variasi animasi untuk anak-anak (elemen individual)
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Navbar />
      {/*  */}
      <div className="full-page-bg">
        <div className="container mb-5">
          {/* Content 1 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="row align-items-center"
          >
            {/* Kolom untuk gambar */}
            <motion.div variants={itemVariants} className="col-md-6">
              <img
                src="assets/about/people.png"
                alt="Deskripsi Gambar"
                className="img-fluid rounded-3"
              />
            </motion.div>

            {/* Kolom untuk teks */}
            <motion.div variants={itemVariants} className="col-md-6">
              <h2 className="mb-3">Tentang Quiztfy</h2>
              <p>
                Quiztfy adalah platform kuis self-assessment berbasis web yang
                dirancang khusus untuk pemula yang ingin mengasah pemahaman
                dasar mereka di bidang Web Development. Platform ini memberikan
                pengalaman belajar yang sederhana namun efektif melalui kumpulan
                soal pilihan ganda, umpan balik langsung, dan sistem penilaian
                otomatis.
              </p>
            </motion.div>
          </motion.div>

          {/* Content 2 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="row flex-md-row-reverse align-items-center mt-5"
          >
            {/* Kolom untuk gambar */}
            <motion.div variants={itemVariants} className="col-md-6">
              <img
                src="assets/about/list.png"
                alt="Deskripsi Gambar"
                className="img-fluid ms-md-5 ms-0 rounded-3"
              />
            </motion.div>

            {/* Kolom untuk teks */}
            <motion.div variants={itemVariants} className="col-md-6 ">
              <h2 className="mb-3">Latar Belakang</h2>
              <p>
                Seiring dengan pesatnya perkembangan teknologi digital,
                kebutuhan akan sarana belajar yang fleksibel dan mandiri semakin
                meningkat. Banyak platform kuis online yang berfokus pada
                kompetisi grup, namun belum banyak yang menyediakan sistem
                evaluasi individu yang ramah pemula. Quiztfy hadir untuk
                menjawab kebutuhan tersebut dengan menghadirkan platform kuis
                berbasis MERN Stack yang memungkinkan pengguna belajar dan
                mengevaluasi pemahaman mereka secara mandiri dan terstruktur.
              </p>
            </motion.div>
          </motion.div>

          {/* Visi & Misi */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-4 py-5"
          >
            <h1 className="text-center mb-md-5">Visi dan Misi</h1>

            <div className="row justify-content-center content-misi-container">
              {/* Visi 1 */}
              <motion.div
                variants={itemVariants}
                className="col-md-4 text-center"
              >
                <h4>1. Belajar Jadi Menyenangkan</h4>
                <p>
                  Menyediakan kuis interaktif agar proses belajar terasa ringan
                  dan seru.
                </p>
              </motion.div>

              {/* Visi 2 */}
              <motion.div
                variants={itemVariants}
                className="col-md-4 text-center"
              >
                <h4>2. Dorong Karir di Dunia Digital</h4>
                <p>
                  Menginspirasi siswa memahami potensi karir di bidang
                  teknologi.
                </p>
              </motion.div>

              {/* Visi 3 */}
              <motion.div
                variants={itemVariants}
                className="col-md-5 mt-md-5 text-center"
              >
                <h4>3. Tingkatkan Skill Digital Anak Bangsa</h4>
                <p>
                  Membekali pengguna dengan dasar keterampilan teknologi masa
                  kini.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Penawaran */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-5"
          >
            <h1 className="text-center mb-3 fw-bold">Apa yang Kami Tawarkan</h1>
            <p className="text-center mx-auto col-md-8">
              Di Tech Quiztify, siswa dapat memilih dari delapan topik utama,
              mulai dari Web Development hingga Artificial Intelligence. Setiap
              topik dirancang untuk pemula yang ingin berkembang di bidang
              teknologi.
            </p>

            <div className="row justify-content-center mt-5 g-4">
              {/* Card 1 */}
              <motion.div variants={itemVariants} className="col-md-3">
                <div className="card h-100 shadow border-0 text-center">
                  <div className="card-body">
                    <i className="bi bi-emoji-smile text-warning fs-1 mb-3"></i>
                    <h5 className="card-title fw-bold">
                      Evaluasi Mandiri Tanpa Tekanan
                    </h5>
                    <p className="card-text">
                      Belajar dengan santai tanpa batasan waktu atau kompetisi,
                      agar fokus memahami materi.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={itemVariants} className="col-md-3">
                <div className="card h-100 shadow border-0 text-center">
                  <div className="card-body">
                    <i className="bi bi-journal-code text-warning fs-1 mb-3"></i>
                    <h5 className="card-title fw-bold">
                      Materi Khusus untuk Pemula
                    </h5>
                    <p className="card-text">
                      Soal disusun dari konsep dasar HTML/CSS, cocok untuk yang
                      baru belajar coding.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={itemVariants} className="col-md-3">
                <div className="card h-100 shadow border-0 text-center">
                  <div className="card-body">
                    <i className="bi bi-check2-circle text-warning fs-1 mb-3"></i>
                    <h5 className="card-title fw-bold">
                      Umpan Balik Langsung & Jelas
                    </h5>
                    <p className="card-text">
                      Lihat jawaban benar dan salah secara visual setelah kuis
                      untuk pembelajaran yang efektif.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/*  */}
      <Footer />
    </>
  );
}
