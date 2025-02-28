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
    const response = await axios.get(`${API}/quiz/${id}`);
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

export default { leaderboard, register, login, getAllQuiz, getQuizById };
