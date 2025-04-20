import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import StudentPanel from "../pages/StudentPanel";
import TeacherPanel from "../pages/TeacherPanel";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      },
      {
        path: "student",
        element: <StudentPanel />,
      },
      {
        path: "teacher",
        element: <TeacherPanel />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
