import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Team from "./pages/Team.jsx";
import Course from "./pages/Course.jsx";
import CommingSoon from "./pages/CommingSoon.jsx";
import Quiz from "./pages/Quiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/Quiz/:categoryName",
    element: <Quiz />,
  },
  {
    path: "/materi",
    element: <CommingSoon />,
  },
  {
    path: "/login",
    element: <CommingSoon />,
  },
  {
    path: "/comming",
    element: <CommingSoon />,
  },
  {
    path: "/Course",
    element: <Course />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
