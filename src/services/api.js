import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "sfms_auth";

function getStoredToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw)?.token : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const api = axios.create({
  baseURL: API_URL || "/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: (payload) => api.post("/auth/login", payload)
};

export const usersApi = {
  all: () => api.get("/users"),
  create: (payload) => api.post("/users", payload),
  setEnabled: (userId, enabled) => api.patch(`/users/${userId}/enabled`, { enabled }),
  resetPassword: (userId, newPassword) => api.patch(`/users/${userId}/password`, { newPassword })
};

export const academicsApi = {
  departments: () => api.get("/academics/departments"),
  saveDepartment: (payload) => api.post("/academics/departments", payload),
  subjects: () => api.get("/academics/subjects"),
  saveSubject: (payload) => api.post("/academics/subjects", payload)
};

export const biodataApi = {
  saveStudent: (payload) => api.post("/biodata/students", payload),
  saveFaculty: (payload) => api.post("/biodata/faculty", payload),
  student: (userId) => api.get(`/biodata/students/${userId}`),
  faculty: (userId) => api.get(`/biodata/faculty/${userId}`)
};

export const facultyApi = {
  attendance: (payload) => api.post("/faculty/attendance", payload),
  marks: (payload) => api.post("/faculty/marks", payload),
  assignments: (payload) => api.post("/faculty/assignments", payload)
};

export const studentApi = {
  attendance: (userId) => api.get(`/students/${userId}/attendance`),
  marks: (userId) => api.get(`/students/${userId}/marks`),
  assignments: (userId) => api.get(`/students/${userId}/assignments`)
};

export const fileApi = {
  upload: (file, folder) => {
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);
    return api.post("/files/upload", body, { headers: { "Content-Type": "multipart/form-data" } });
  }
};

export const aiApi = {
  chat: (message, history = []) => api.post("/ai/chat", { message, history }),
  summarize: (file) => {
    const body = new FormData();
    body.append("file", file);
    return api.post("/ai/summarize", body, { headers: { "Content-Type": "multipart/form-data" } });
  }
};

export default api;
