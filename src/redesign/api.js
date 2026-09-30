import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://quizz-be.vercel.app/api",
  timeout: 15000,
});
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("session-expired"));
    }
    return Promise.reject(
      new Error(
        error.response?.data?.message || "Koneksi terputus. Silakan coba lagi.",
      ),
    );
  },
);
export default client;

export function session() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const user = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atob(part), (c) => c.charCodeAt(0)),
      ),
    );
    return user.exp * 1000 > Date.now() ? user : null;
  } catch {
    return null;
  }
}
