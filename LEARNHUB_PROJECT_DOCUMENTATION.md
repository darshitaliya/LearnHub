# 🎓 LearnHub — Complete Project Structure & System Documentation

> **Official Comprehensive Project Manual & Architecture Specification**  
> *Prepared for Stakeholders, Developers, Reviewers, and Evaluators.*

---

## 📌 Executive Summary

**LearnHub** is an enterprise-grade, full-stack **Learning Management System (LMS)** designed to deliver a modern, futuristic e-learning experience. It connects students and educators with zero-cost barrier-free high-quality curriculum, structured multi-module courses, interactive video streaming, automated completion certification, administrative management, dynamic CAPTCHA security, and executive audit intelligence.

---

## 🛠️ Complete Technology Stack

| Layer | Technology | Purpose / Description |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18 + Vite** | High-performance SPA with instant HMR and optimized production bundles. |
| **Styling & Design** | **Vanilla CSS + Material Tokens** | Custom design system using Google Fonts (Plus Jakarta Sans), glassmorphism, responsive grid, and custom dark/light theme tokens. |
| **Icons & Media** | **Google Material Symbols** | Sharp, lightweight SVG/font icons used across navigation, badges, and controls. |
| **Backend API** | **Node.js + Express.js** | Modular RESTful API server handling authentication, CRUD operations, reporting, and security. |
| **Database (Primary)** | **MongoDB Atlas + Mongoose** | Production cloud database storing Users, Courses, Enrollments, Orders, and Progress. |
| **Database (Fallback)** | **Hybrid Persistent JSON Store** | Zero-downtime offline storage fallback (`persistent_db.json`) ensuring uninterrupted local development and serverless deployment. |
| **Security & Auth** | **JWT + Bcrypt.js + HTTP-Only Cookies** | Enterprise authentication with bcrypt hashed passwords, signed JWT tokens, and secure cookies. |
| **Bot Protection** | **Dynamic SVG CAPTCHA Engine** | Proprietary server-side distorted visual alphanumeric CAPTCHA with signed cryptographic tokens. |
| **Reporting & Export**| **RFC-4180 CSV + Native Print Engine** | One-click raw CSV data generation with UTF-8 BOM and formal letterhead PDF formatting. |

---

## 📂 Project Directory Structure

```plaintext
LearnHub/
├── client/                          # React Frontend Application
│   ├── public/                      # Static assets, logos, and high-definition hero artwork
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── AdminSidebar.jsx     # Navigation sidebar for all Admin modules
│   │   │   ├── CaptchaField.jsx     # Interactive dynamic CAPTCHA verification component
│   │   │   ├── CourseCard.jsx       # Standardized course thumbnail & badge card
│   │   │   ├── EnrollmentFormModal  # Student course application pop-up modal
│   │   │   ├── Footer.jsx           # Global platform footer
│   │   │   ├── Logo.jsx             # Official LearnHub gradient logo
│   │   │   ├── Navbar.jsx           # Responsive global navigation header
│   │   │   └── ProtectedRoute.jsx   # Role-based route guard (Student vs Admin)
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state (Login, Register, Logout, Profile)
│   │   ├── data/
│   │   │   └── coursePresets50.js   # 50+ rich real-world course templates with YouTube lectures
│   │   ├── pages/                   # Application Pages & Route Views
│   │   │   ├── HomePage.jsx         # Landing page with 6 static curated courses
│   │   │   ├── CourseListingPage    # Filterable & searchable course catalog
│   │   │   ├── VideoPlayerPage.jsx  # Interactive classroom, video player & certificate generator
│   │   │   ├── StudentDashboardPage # Student active courses & learning metrics
│   │   │   ├── StudentProfilePage   # Student personal profile & bio settings
│   │   │   ├── LoginPage.jsx        # Login page with CAPTCHA & demo credential prefill
│   │   │   ├── RegisterPage.jsx     # Student signup page with CAPTCHA & redirect
│   │   │   ├── ForgotPasswordPage   # Password recovery request page with CAPTCHA
│   │   │   ├── ContactPage.jsx      # Support inquiries form with CAPTCHA
│   │   │   ├── AdminDashboardPage   # Executive analytics & live KPI dashboard
│   │   │   ├── AdminCoursesPage.jsx # Course CRUD with 50+ presets & LIFO sorting
│   │   │   ├── AdminUsersPage.jsx   # User management with soft delete & LIFO sorting
│   │   │   ├── AdminEnrollmentsPage # Enrollment applications & manual enrollments
│   │   │   └── AdminReportsPage.jsx # CSV export & PDF printable audit report generator
│   │   ├── services/
│   │   │   └── api.js               # Axios HTTP client with base URL & interceptors
│   │   ├── App.jsx                  # React Router root definition
│   │   ├── index.css                # Global styles, typography, and @media print rules
│   │   └── main.jsx                 # Client entry point
│   ├── index.html                   # HTML template with SEO tags & Google Fonts
│   ├── package.json                 # Client dependencies
│   └── vite.config.js               # Vite build configuration
│
├── server/                          # Express.js Backend Server
│   ├── config/
│   │   └── db.js                    # MongoDB Atlas connection handler
│   ├── controllers/                 # Business Logic Controllers
│   │   ├── adminController.js       # Admin stats, users, enrollments, reports
│   │   ├── authController.js        # Register, Login, Me, Profile update
│   │   ├── captchaController.js     # CAPTCHA generation & validation
│   │   ├── courseController.js      # Course CRUD & search filtering
│   │   ├── orderController.js       # Checkout & course orders
│   │   └── progressController.js    # Lesson completion & certificate unlocks
│   ├── data/
│   │   └── persistent_db.json       # Auto-synced fallback persistent data store
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT token verification & role enforcement
│   │   └── errorHandler.js          # Centralized error handler
│   ├── models/                      # Mongoose Database Schemas
│   │   ├── User.js                  # User schema (Name, Email, Phone, Role, Soft Delete)
│   │   ├── Course.js                # Course schema (Modules, Lessons, Pricing, Ratings)
│   │   ├── Enrollment.js            # Enrollment schema (Student, Goal, Profession, Status)
│   │   ├── Order.js                 # Order records
│   │   └── Progress.js              # Lesson progress & certificate status
│   ├── routes/                      # Express Route Declarations
│   │   ├── adminRoutes.js           # /api/admin/*
│   │   ├── authRoutes.js            # /api/auth/*
│   │   ├── captchaRoutes.js         # /api/captcha/*
│   │   ├── courseRoutes.js          # /api/courses/*
│   │   ├── orderRoutes.js           # /api/orders/*
│   │   └── progressRoutes.js        # /api/progress/*
│   ├── services/
│   │   ├── captchaService.js        # Distorted SVG challenge generator & token signer
│   │   └── dbStore.js               # Unified dual-layer database abstraction (Mongo + JSON)
│   ├── utils/
│   │   └── seed.js                  # Initial database seeder
│   ├── index.js                     # Main server entry & static SPA server
│   └── package.json                 # Backend dependencies
└── README.md                        # Quickstart documentation
```

---

## 🖥️ Page-by-Page Functional Breakdown

### 1. Landing Page (`/` • `HomePage.jsx`)
* **Purpose**: Primary marketing and brand showcase for new and prospective students.
* **Features**:
  * Futuristic hero banner with 3D ambient glows and high-definition illustrations.
  * **6 Static HD Curated Popular Courses**: High-demand courses displayed with technology tags, ratings, and instant redirection to the course catalog.
  * Category navigation tags (Computer Science, Data Science, Design, Business).
  * Direct action buttons to explore curriculum or start free learning.

---

### 2. Course Catalog & Advanced Search (`/courses` • `CourseListingPage.jsx`)
* **Purpose**: Searchable, filterable directory of all live database courses published by educators and admins.
* **Features**:
  * **Real-time Keyword Search**: Searches course titles, descriptions, and technology stacks.
  * **Multi-Facet Filtering**: Filter by category (Computer Science, Design, Business), level (Beginner, Intermediate, Advanced), and pricing (Free vs Paid).
  * **Interactive Pagination**: Smooth 6-item pagination with smart page counters.
  * **Direct Enrollment**: Opens the modal to enroll in any course instantly.

---

### 3. Interactive Video Player & Classroom (`/player` • `VideoPlayerPage.jsx`)
* **Purpose**: Distraction-free interactive learning room where students watch lectures and earn certificates.
* **Features**:
  * **Embedded YouTube Video Player**: Streams real tutorials directly inside a clean cinema container.
  * **Sidebar Curriculum Accordion**: Shows modules, lesson list, durations, and checkmark icons for completed lessons.
  * **Interactive Notes Tab**: Students can take notes that save directly into local storage.
  * **Automated Completion Certificate**: When 100% of lessons are completed, a verified LearnHub Certificate of Completion is generated on-screen with print and download support.

---

### 4. Student Dashboard (`/dashboard` • `StudentDashboardPage.jsx`)
* **Purpose**: Personalized learning headquarters for students.
* **Features**:
  * Overview of enrolled courses, completed hours, in-progress certifications.
  * Quick "Resume Learning" button that takes the student directly back to their current lesson.

---

### 5. Student Profile & Settings (`/profile` • `StudentProfilePage.jsx`)
* **Purpose**: Account management for students.
* **Features**:
  * View and update full name, contact phone number, bio, and avatar.
  * View security role and registered date.

---

### 6. Authentication Suite (`/login`, `/register`, `/forgot-password`)
* **Login (`LoginPage.jsx`)**:
  * Form validation for Email & Password.
  * **Mandatory CAPTCHA**: Dynamic SVG code challenge required before signing in.
  * **One-Click Demo Fill**: "Student Demo" and "Admin Demo" buttons pre-fill credentials without bypassing CAPTCHA.
* **Register (`RegisterPage.jsx`)**:
  * Full name, email, phone number, and password matching validation.
  * Mandatory CAPTCHA validation.
  * **Post-Registration Flow**: Automatically redirects to `/login` with prefilled email & password for seamless verification.
* **Forgot Password (`ForgotPasswordPage.jsx`)**:
  * Anti-abuse CAPTCHA verification before dispatching reset instructions.

---

### 7. Admin Dashboard (`/admin` • `AdminDashboardPage.jsx`)
* **Purpose**: Executive control center for platform administrators.
* **Features**:
  * Live KPI cards: Total Students, Published Courses, Active Enrollments, and System Health.
  * Domain category distribution metrics.
  * Quick links to add courses, view users, or export reports.

---

### 8. Admin Course Management (`/admin/courses` • `AdminCoursesPage.jsx`)
* **Purpose**: Full CRUD management of the course catalog.
* **Features**:
  * **LIFO (Newest First) Display**: Newly added courses immediately appear at the top.
  * **50+ Instant Presets**: Pre-configured courses with real YouTube videos across MERN, Python, GCP, UI/UX, AI, and DevOps.
  * **Soft Delete**: Courses are marked `isDeleted: true` instead of permanent loss.
  * Search, category filter, and 8-item pagination.

---

### 9. Admin User Management (`/admin/users` • `AdminUsersPage.jsx`)
* **Purpose**: User administration, security role assignment, and access control.
* **Features**:
  * LIFO list of all registered accounts.
  * Create new user accounts (Student / Admin).
  * Edit user names, emails, and contact phones.
  * **Soft Delete**: Deactivated users preserve database historical integrity.
  * Search by name/email and filter by role.

---

### 10. Admin Enrollment Applications (`/admin/enrollments` • `AdminEnrollmentsPage.jsx`)
* **Purpose**: Review all student course applications and manual registrations.
* **Features**:
  * LIFO list of all student enrollment forms with learning goals and profession.
  * Manual enrollment tool allowing admins to enroll any student into any course.
  * Search and course-specific dropdown filters.

---

### 11. Admin Reports & Audit Generator (`/admin/reports` • `AdminReportsPage.jsx`)
* **Purpose**: Export intelligence reports for management and compliance.
* **Features**:
  * **Report Switcher**:
    1. Student Enrollments Report
    2. Course Catalog & Curriculum Report
    3. Registered Accounts & Roles Roster
    4. Executive System Health Summary
  * **RFC-4180 CSV Export**: Generates clean CSV files with UTF-8 BOM and full field mapping.
  * **JSON Data Export**: Downloads structured JSON payload for external integrations.
  * **Print / PDF Generator**: Formatted `@media print` layout featuring official LearnHub letterhead, metadata table, bordered data rows, and authorized sign-off footer with all sidebars hidden.

---

### 12. Contact & Support Center (`/contact` • `ContactPage.jsx`)
* **Purpose**: Learners and partners can submit inquiries directly.
* **Features**:
  * Interactive contact form with category selector.
  * Mandatory CAPTCHA verification to eliminate spam.
  * Frequently Asked Questions (FAQ) accordion.

---

## 🔒 Key Security & Architectural Highlights

1. **Dual-Layer Database Persistence**:
   - Primary: High-availability MongoDB Atlas cloud instance.
   - Fallback: Auto-synchronized `persistent_db.json` ensuring 100% uptime even if network or cloud database is temporarily disconnected.
2. **Stateless Dynamic CAPTCHA Engine**:
   - Generates random 5-character codes rendered with distorted SVG lines, dots, and rotation.
   - Signs code inside a JWT token with a 10-minute expiration, eliminating server-side session memory overhead.
3. **Soft Delete Implementation**:
   - Deleting courses, users, or enrollments marks them with `{ isDeleted: true, deletedAt: timestamp }`, preventing accidental data loss.
4. **LIFO Data Presentation**:
   - Backend queries and frontend state handlers enforce Last-In, First-Out (Newest First) ordering for real-time visibility of latest activities.
5. **Universal Production Single-Port Deployment**:
   - Express server automatically serves the compiled Vite React frontend from `/client/dist`, enabling single-command deployments on Railway, Render, Heroku, or Docker.

---

## 🚀 How to Run the Project Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Quick Setup Commands
```bash
# Clone the repository
git clone https://github.com/darshitaliya/LearnHub.git
cd LearnHub

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
cd ..

# Build Frontend Bundle
npm --prefix client run build

# Start Full Production Server (Single Port: http://localhost:5000)
node server/index.js
```

### 3. Default Demo Credentials
- **Student Account**: `alex@learnhub.com` / Password: `student123`
- **Administrator Account**: `admin@learnhub.com` / Password: `admin123`

---

*Document compiled and verified for LearnHub Project Release.*
