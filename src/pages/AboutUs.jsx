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
              <h2 className="mb-3">Tentang Kami</h2>
              <p>
                Tech Quiztify adalah platform edukatif berbasis kuis yang kami
                kembangkan bersama dengan tujuan untuk menginspirasi dan
                mengedukasi generasi muda Indonesia dalam dunia teknologi
                informasi dan pemrograman. Kami terdiri dari tim beranggotakan
                tujuh orang yang berkomitmen untuk memberikan akses pengetahuan
                dan pengalaman belajar interaktif bagi pelajar SMP hingga SMA di
                seluruh Indonesia.
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
            <motion.div variants={itemVariants} className="col-md-6">
              <h2 className="mb-3">Latar Belakang</h2>
              <p>
                Tech Quiztify hadir sebagai respons atas meningkatnya minat anak
                muda terhadap bidang teknologi informasi dan pemrograman. Kami
                memahami bahwa generasi muda memerlukan wadah yang dapat
                membimbing mereka memahami konsep teknologi sekaligus membantu
                mereka menjelajahi jalur karir potensial di bidang ini. Platform
                ini juga mendukung visi Indonesia Emas 2045, di mana generasi
                muda yang cerdas dan berdaya saing tinggi akan menjadi kunci
                bagi kemajuan bangsa.
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
                <h4>1. Memberikan Pendidikan yang Interaktif</h4>
                <p className="">
                  Menyediakan kuis dan materi yang relevan agar siswa bisa
                  belajar dengan cara yang lebih menyenangkan.
                </p>
              </motion.div>

              {/* Visi 2 */}
              <motion.div
                variants={itemVariants}
                className="col-md-4 text-center"
              >
                <h4>2. Menginspirasi Jalur Karir di Teknologi</h4>
                <p>
                  Menunjukkan jalur karir yang dapat dikejar di bidang teknologi
                  berdasarkan minat dan keterampilan mereka.
                </p>
              </motion.div>

              {/* Visi 3 */}
              <motion.div
                variants={itemVariants}
                className="col-md-5 mt-md-5 text-center"
              >
                <h4>3. Memajukan Kompetensi Digital Anak Bangsa</h4>
                <p>
                  Membantu siswa membangun keterampilan digital dasar hingga
                  tingkat lanjut untuk menghadapi masa depan yang penuh dengan
                  peluang teknologi.
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
            <h1 className="text-center">Apa yang Kami Tawarkan</h1>
            <p className="text-center mx-auto col-md-8">
              Di Tech Quiztify, siswa dapat memilih dari delapan topik utama,
              mulai dari Web Development hingga Artificial Intelligence. Setiap
              topik dirancang untuk
            </p>
            <div className="row justify-content-center mt-5 gap-4">
              {/* Box 1 */}
              <motion.div
                variants={itemVariants}
                className="col-md-3 p-4 shadow rounded bg-white"
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h1 className="fw-bold text-warning">1</h1>
                  <p>Membaca Materi</p>
                </div>
              </motion.div>

              {/* Box 2 */}
              <motion.div
                variants={itemVariants}
                className="col-md-3 p-4 shadow rounded bg-white mx-md-5"
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h1 className="fw-bold text-warning">2</h1>
                  <p>Mengikuti Kuis</p>
                </div>
              </motion.div>

              {/* Box 3 */}
              <motion.div
                variants={itemVariants}
                className="col-md-3 p-4 shadow rounded bg-white"
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h1 className="fw-bold text-warning">3</h1>
                  <p>Menjelajahi Jenjang Karir</p>
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
