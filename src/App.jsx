import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Academics from "./pages/Academics.jsx";
import Biodata from "./pages/Biodata.jsx";
import Attendance from "./pages/Attendance.jsx";
import Marks from "./pages/Marks.jsx";
import Assignments from "./pages/Assignments.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

const router = createBrowserRouter(
  [
    { path: "/login", element: <Login /> },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { path: "/", element: <Dashboard /> },
            {
              element: <ProtectedRoute roles={["SUPERADMIN", "ADMIN"]} />,
              children: [
                { path: "/users", element: <Users /> },
                { path: "/academics", element: <Academics /> },
                { path: "/biodata", element: <Biodata /> }
              ]
            },
            {
              element: <ProtectedRoute roles={["FACULTY", "STUDENT"]} />,
              children: [
                { path: "/attendance", element: <Attendance /> },
                { path: "/marks", element: <Marks /> },
                { path: "/assignments", element: <Assignments /> }
              ]
            },
            { path: "/profile", element: <Profile /> }
          ]
        }
      ]
    },
    { path: "*", element: <Navigate to="/" replace /> }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
