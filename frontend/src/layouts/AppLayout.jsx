import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, ClipboardCheck, GraduationCap, LayoutDashboard, LogOut, School, UserRound, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Chatbot from "../components/Chatbot.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["SUPERADMIN", "ADMIN", "FACULTY", "STUDENT"] },
  { to: "/users", label: "Users", icon: Users, roles: ["SUPERADMIN", "ADMIN"] },
  { to: "/academics", label: "Academics", icon: School, roles: ["SUPERADMIN", "ADMIN"] },
  { to: "/biodata", label: "Biodata", icon: UserRound, roles: ["SUPERADMIN", "ADMIN"] },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck, roles: ["FACULTY", "STUDENT"] },
  { to: "/marks", label: "Marks", icon: GraduationCap, roles: ["FACULTY", "STUDENT"] },
  { to: "/assignments", label: "Assignments", icon: BookOpen, roles: ["FACULTY", "STUDENT"] },
  { to: "/profile", label: "Profile", icon: UserRound, roles: ["FACULTY", "STUDENT", "ADMIN", "SUPERADMIN"] }
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const allowed = links.filter((link) => link.roles.includes(user.role));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <School size={28} />
          <div>
            <strong>SFMS</strong>
            <span>University Suite</span>
          </div>
        </div>
        <nav className="nav flex-column gap-1">
          {allowed.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button className="btn btn-outline-light mt-auto d-flex align-items-center gap-2" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow mb-1">{user.role}</p>
            <h1 className="h4 mb-0">Welcome, {user.name}</h1>
          </div>
          <span className="badge rounded-pill text-bg-primary">{user.userId}</span>
        </header>
        <Outlet />
        <Chatbot />
      </main>
    </div>
  );
}
