import axios from "axios";

const API = "https://quizz-be.vercel.app/api";

// USER
// leaderboard
const leaderboard = async () => {
  try {
    const response = await axios.get(`${API}/leaderboard`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

// Login
const login = async (formData) => {
  try {
    const response = await axios.post(`${API}/login`, formData);

    return response.data;
  } catch (error) {
    // Buat custom error object yang lebih predictable
    const customError = new Error();

    if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    } else if (error.response?.data) {
      customError.message =
        typeof error.response.data === "string"
          ? error.response.data
          : "Login failed";
    } else {
      customError.message = error.message || "Network error";
    }

    throw customError;
    // console.log(error);
  }
};
// Register
const register = async (formData: any) => {
  try {
    const response = await axios.post(`${API}/register`, formData);
    return response.data;
  } catch (error: any) {
    console.log("Service caught error:", error);

    // Buat custom error object yang lebih predictable
    const customError = new Error();

    if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    } else if (error.response?.data) {
      customError.message =
        typeof error.response.data === "string"
          ? error.response.data
          : "Registration failed";
    } else {
      customError.message = error.message || "Network error";
    }

    throw customError;
  }
};
// user Info
const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API}/user/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

// update user
const updateUser = async (formData: any) => {
  try {
    const response = await axios.put(`${API}/user/update`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Service caught error:", error);

    // Buat custom error object yang lebih predictable
    const customError = new Error();

    if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    } else if (error.response?.data) {
      customError.message =
        typeof error.response.data === "string"
          ? error.response.data
          : "Registration failed";
    } else {
      customError.message = error.message || "Network error";
    }

    throw customError;
  }
};

// quiz

// const getAllQuiz = async () => {
//   try {
//     const response = await axios.get(`${API}/quiz`);
//     return response.data;
//   } catch (error) {
//     const err = error as Error;
//     console.log(err.message);
//   }
// };

// const getQuizById = async (id) => {
//   try {
//     // const token = localStorage.getItem("token");
//     // if (!token) {
//     //   throw new Error("No token found");
//     // }

//     const response = await axios.get(`${API}/quiz/${id}`, {
//       // headers: {
//       //   Authorization: `Bearer ${token}`,
//       // },
//     });
//     return response.data;
//   } catch (error) {
//     const err = error as Error;
//     console.error("Error fetching quiz:", err.message);
//     throw err; // Lempar error agar bisa ditangani oleh komponen
//   }
// };

// const questionSubmit = async (formData) => {
//   try {
//     const token = localStorage.getItem("token"); // Ambil token dari localStorage
//     if (!token) {
//       throw new Error("No token found");
//     }

//     const response = await axios.post(`${API}/quiz/submit`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Sertakan token dalam header
//       },
//     });
//     return response.data;
//   } catch (error) {
//     const err = error as Error;
//     console.log(err.message);
//     throw err;
//   }
// };

// materi
const getAllMateri = async () => {
  try {
    const response = await axios.get(`${API}/material`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

const getMateriById = async (id) => {
  try {
    const response = await axios.get(`${API}/material/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};
const getSectionsByMaterialId = async (materialId) => {
  try {
    const response = await axios.get(`${API}/material/${materialId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.sections;
  } catch (error) {
    console.error("Error fetching material sections:", error);
    return [];
  }
};

const getQuizById = async (quizId) => {
  try {
    const response = await axios.get(`${API}/quiz/${quizId}/quiz`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

const submitQuizResult = async (quizId, answers, score) => {
  try {
    const response = await axios.post(
      `${API}/quiz/${quizId}/submit`,
      {
        answers,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};

const review = async (quizId) => {
  try {
    const response = await axios.post(
      `${API}/quiz/${quizId}/review`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};

// export const dummyQuizData = {
//   id: 1,
//   title: "Web Development Fundamentals: HTML, CSS & JS",
//   description:
//     "Uji pemahaman fundamental Anda tentang HTML untuk struktur, CSS untuk styling, dan JavaScript untuk interaktivitas.",
//   img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
//   questions: [
//     {
//       id: 1,
//       quizId: 1,
//       question: "Apa kepanjangan dari HTML?",
//       options: [
//         "HyperText Markup Language",
//         "High Transfer Markup Language",
//         "Hyper Tool Multi Language",
//         "HyperText Machine Language",
//       ],
//       correctAnswer: "HyperText Markup Language",
//       explanation:
//         "HTML adalah singkatan dari HyperText Markup Language, bahasa markup untuk membuat halaman web.",
//     },
//     {
//       id: 2,
//       quizId: 1,
//       question: "Tag HTML manakah yang digunakan untuk membuat paragraf teks?",
//       options: ["<par>", "<text>", "<p>", "<paragraph>"],
//       correctAnswer: "<p>",
//       explanation: "Tag <p> digunakan untuk membuat paragraf dalam HTML.",
//     },
//     {
//       id: 3,
//       quizId: 1,
//       question:
//         "Atribut HTML mana yang wajib ada pada tag `<img>` untuk aksesibilitas?",
//       options: ["src", "href", "title", "alt"],
//       correctAnswer: "alt",
//       explanation:
//         "Atribut 'alt' wajib ada pada tag <img> untuk memberikan deskripsi gambar bagi screen reader.",
//     },
//     {
//       id: 4,
//       quizId: 1,
//       question:
//         "Elemen HTML5 semantik manakah yang digunakan untuk mengelompokkan konten navigasi utama situs?",
//       options: ["<navigation>", "<menu>", "<nav>", "<links>"],
//       correctAnswer: "<nav>",
//       explanation:
//         "Elemen <nav> digunakan untuk mengelompokkan link navigasi utama dalam HTML5.",
//     },
//     {
//       id: 5,
//       quizId: 1,
//       question:
//         'Bagaimana cara memilih semua elemen `<p>` yang memiliki class `"highlight"` di CSS?',
//       options: ["p.highlight", "p highlight", "p#highlight", ".highlight p"],
//       correctAnswer: "p.highlight",
//       explanation:
//         "Sintaks p.highlight digunakan untuk memilih elemen <p> dengan class 'highlight'.",
//     },
//     {
//       id: 6,
//       quizId: 1,
//       question:
//         "Properti CSS manakah yang digunakan untuk mengubah warna latar belakang sebuah elemen?",
//       options: ["color", "background-color", "bgcolor", "background"],
//       correctAnswer: "background-color",
//       explanation:
//         "Properti 'background-color' digunakan untuk mengatur warna latar belakang elemen.",
//     },
//     {
//       id: 7,
//       quizId: 1,
//       question:
//         "Manakah dari berikut ini yang merupakan unit panjang relatif dalam CSS?",
//       options: ["px", "cm", "em", "pt"],
//       correctAnswer: "em",
//       explanation:
//         "Unit 'em' adalah unit relatif yang berdasarkan ukuran font elemen parent.",
//     },
//     {
//       id: 8,
//       quizId: 1,
//       question: "Properti CSS `display: flex;` diterapkan pada elemen apa?",
//       options: [
//         "Elemen anak (flex item)",
//         "Elemen pembungkus (flex container)",
//         "Semua elemen di halaman",
//         "Hanya elemen gambar",
//       ],
//       correctAnswer: "Elemen pembungkus (flex container)",
//       explanation:
//         "Properti display: flex diterapkan pada elemen container untuk membuat flex container.",
//     },
//     {
//       id: 9,
//       quizId: 1,
//       question:
//         "Keyword JavaScript manakah yang digunakan untuk mendeklarasikan variabel yang nilainya tidak bisa diubah (immutable)?",
//       options: ["let", "var", "const", "static"],
//       correctAnswer: "const",
//       explanation:
//         "Keyword 'const' digunakan untuk mendeklarasikan variabel dengan nilai yang tidak dapat diubah.",
//     },
//     {
//       id: 10,
//       quizId: 1,
//       question:
//         "Metode JavaScript manakah yang digunakan untuk menulis pesan ke konsol browser?",
//       options: [
//         "document.write()",
//         "alert()",
//         "console.log()",
//         "window.print()",
//       ],
//       correctAnswer: "console.log()",
//       explanation:
//         "Method console.log() digunakan untuk menampilkan pesan di konsol browser.",
//     },
//     {
//       id: 11,
//       quizId: 1,
//       question:
//         "Operator mana yang digunakan untuk perbandingan nilai dan tipe data secara ketat (strict equality) di JavaScript?",
//       options: ["==", "===", "!=", "equals"],
//       correctAnswer: "===",
//       explanation:
//         "Operator '===' melakukan perbandingan nilai dan tipe data secara ketat.",
//     },
//     {
//       id: 12,
//       quizId: 1,
//       question:
//         "Bagaimana cara menambahkan komentar satu baris dalam kode JavaScript?",
//       options: ["", "/* Ini komentar */", "// Ini komentar", "# Ini komentar"],
//       correctAnswer: "// Ini komentar",
//       explanation:
//         "Sintaks '//' digunakan untuk membuat komentar satu baris dalam JavaScript.",
//     },
//   ],
// };

export default {
  // user
  leaderboard,
  login,
  register,
  getUserInfo,
  updateUser,

  // quiz
  getQuizById,
  submitQuizResult,

  // materi
  getAllMateri,
  getMateriById,
  getSectionsByMaterialId,
};
