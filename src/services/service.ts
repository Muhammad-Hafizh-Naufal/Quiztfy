import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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
const updateUser = async (formData) => {
  try {
    // Filter out empty password
    const cleanData = { ...formData };
    if (!cleanData.password || cleanData.password.trim() === "") {
      delete cleanData.password;
    }

    const response = await axios.patch(`${API}/user/update`, cleanData, {
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
        score,
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
