import axios from "axios";

const API = "http://localhost:3000/api";

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

// Register
const register = async (formData) => {
  try {
    const response = await axios.post(`${API}/register`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (formData) => {
  try {
    const response = await axios.post(`${API}/login`, formData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// quiz

const getAllQuiz = async () => {
  try {
    const response = await axios.get(`${API}/quiz`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

const getQuizById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching quiz:", err.message);
    throw err; // Lempar error agar bisa ditangani oleh komponen
  }
};

const questionSubmit = async (formData) => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(`${API}/quiz/submit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    throw err;
  }
};

// materi
const getAllMateri = async () => {
  try {
    const response = await axios.get(`${API}/material`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

const getMateriById = async (id) => {
  try {
    const response = await axios.get(`${API}/material/${id}`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};
const getSectionsByMaterialId = async (materialId) => {
  try {
    const response = await axios.get(`${API}/material/${materialId}`);
    return response.data.sections; // pastikan backend mengembalikan `sections`
  } catch (error) {
    console.error("Error fetching material sections:", error);
    return [];
  }
};

export default {
  leaderboard,
  register,
  login,
  getAllQuiz,
  getQuizById,
  questionSubmit,

  // materi
  getAllMateri,
  getMateriById,
  getSectionsByMaterialId,
};
