# Student Faculty Management System

Production-oriented full-stack university management system with React, Spring Boot, MySQL, JWT, BCrypt, RBAC, JPA relationships, DTOs, validation, CORS, and Cloudinary upload support.

## Architecture

- `backend/`: Spring Boot REST API using layered packages: `controller`, `service`, `repository`, `model`, `dto`, `security`, `config`, `exception`.
- `frontend/`: React + Vite app using `components`, `pages`, `services`, `routes`, `layouts`, `context`, and Bootstrap 5.
- Auth flow: React submits credentials to `/api/auth/login`, stores JWT in `localStorage`, sends `Authorization: Bearer <token>` through an Axios interceptor, and Spring Security validates it through `JwtAuthenticationFilter`.
- RBAC: backend method security protects SUPERADMIN, ADMIN, FACULTY, and STUDENT operations; frontend routes hide unauthorized pages.

## Database Schema

The backend creates normalized MySQL tables through JPA:

- `roles(id, name)`
- `users(index, user_id, name, email, password, role_id, created_at, enabled)`
- `departments(id, code, name)`
- `subjects(id, code, name, semester, department_id, faculty_id)`
- `student_biodata(id, user_index, father_name, mother_name, dob, gender, address, phone, emergency_contact, blood_group, department_id, academic_year, section, image_url)`
- `faculty_biodata(id, user_index, qualification, experience, specialization, department_id, image_url)`
- `attendance(id, student_id, subject_id, faculty_id, attendance_date, present)`
- `marks(id, student_id, subject_id, faculty_id, exam_type, score, max_score)`
- `assignments(id, subject_id, faculty_id, title, description, due_date, file_url, created_at)`
- `submissions(id, assignment_id, student_id, file_url, submitted_at)`

Passwords are always stored as BCrypt hashes. Cloudinary stores files; only secure URLs are saved in database fields.

## Run Backend

Create a MySQL database or let the JDBC URL create it, then set production secrets:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell, use:

```powershell
.\mvnw.cmd spring-boot:run
```

Important environment variables:

```bash
DB_URL=jdbc:mysql://localhost:3306/student_faculty_management?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=your-password
JWT_SECRET=replace-with-a-long-strong-secret-at-least-32-bytes
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

The AI chatbot is available inside the authenticated React dashboard. The browser calls `/api/ai/chat`; the backend calls OpenAI with `OPENAI_API_KEY`, so the key is never exposed to frontend code.

Seed login:

- Email: `superadmin@university.edu`
- Password: `ChangeMe@12345`

Change these using `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD` before production use.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:8080/api` if your backend URL differs.
