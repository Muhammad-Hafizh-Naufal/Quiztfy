import axios from "axios";

const API = "https://quizz-be.vercel.app/api";

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

export default { leaderboard, register, login };
