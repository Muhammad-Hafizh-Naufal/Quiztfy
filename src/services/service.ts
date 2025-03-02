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

// getAllQuiz
const getAllQuiz = async () => {
  try {
    const response = await axios.get(`${API}/quiz`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

// get quiz by name/id
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

// question Submit

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

export default {
  leaderboard,
  register,
  login,
  getAllQuiz,
  getQuizById,
  questionSubmit,
};
