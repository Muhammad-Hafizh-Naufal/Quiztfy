// 4. Updated main.jsx - Perbaikan routing
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Dashboard.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Course from "./pages/Course.jsx";
import CommingSoon from "./pages/CommingSoon.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "../src/pages/ProtectedRoute.jsx";
import Loading from "./components/Loading.jsx";
import Beranda from "./pages/Beranda.jsx";
import CourseSection from "./pages/CourseSection.jsx";
// import CourseCategory from "./pages/CourseCategory.jsx"; // Import the CourseCategory component

import HalamanKuis from "./pages/HalamanKuis.jsx";
import Review from "./pages/Review.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/materi/:materialId",
    element: <CourseSection />,
  },
  {
    path: "/loading",
    element: <Loading show={true} />,
  },
  {
    path: "/kuis/:id",
    element: <HalamanKuis />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/materi",
        element: <CommingSoon />,
      },
      {
        path: "/course/:id", // This shows the CourseCategory (materi + quiz options)
        element: <Course />,
      },
      {
        path: "/comming",
        element: <CommingSoon />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
