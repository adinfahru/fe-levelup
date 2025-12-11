# LevelUp Frontend

LevelUp is an employee development management system frontend built with React. This application enables employees to browse and enroll in training modules, track their progress, and submit final work for manager review. Managers can create modules, review submissions, and monitor employee development.

## 🎯 Project Overview

The LevelUp Frontend provides a modern, responsive interface for:

- **User Authentication** - Secure login with JWT token management and role-based access
- **Employee Dashboard** - View available modules, track enrollments, and monitor personal progress
- **Module Management** - Browse training modules with detailed content and structured learning paths
- **Progress Tracking** - Interactive checklist for module items with evidence submission
- **Manager Features** - Module creation, submission review, employee oversight, and analytics dashboard
- **Admin Panel** - User and position management with comprehensive controls

## 🏗️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Fetch
- **Icons**: Lucide React

## 📋 Key Features

### Authentication & Authorization

- Secure login with JWT token storage
- Role-based routing and component visibility
- Password change functionality
- Automatic token refresh and session management
- Protected routes for Admin, Manager, and Employee roles

### Employee Features

- Browse available training modules
- Enroll in modules with automatic target date calculation
- Track current enrollment progress with visual indicators
- Mark module items as completed with evidence/notes
- View enrollment history (completed and paused)
- Resume paused enrollments
- Submit final project work

### Manager Features

- Create and manage training modules with structured items
- Review and approve/reject employee submissions
- View all managed employees and their progress
- Dashboard with key metrics and statistics
- Update employee idle status
- View detailed employee development history

### Admin Features

- Create, update, and deactivate user accounts
- Manage job positions
- View all system users with filtering
- Assign roles and managers to employees

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running at `https://localhost:7118`

### Installation

```bash
# Clone the repository
git clone https://github.com/adinfahru/fe-levelup.git
cd fe-levelup

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://localhost:7118/api/v1
VITE_APP_NAME=LevelUp
```

## 📁 Project Structure

```
fe-levelup/
├── public/                              # Static assets
│   └── vite.svg
│
├── src/
│   ├── 📁 api/                          # API calls (Axios)
│   │   ├── auth.api.js                  # Login, change password
│   │   ├── users.api.js                 # User CRUD operations
│   │   ├── positions.api.js             # Position management
│   │   ├── modules.api.js               # Module CRUD operations
│   │   ├── enrollments.api.js           # Enrollment operations
│   │   └── submissions.api.js           # Submission operations
│   │
│   ├── 📁 hooks/                        # Custom React hooks
│   │   ├── useAuth.js                   # Authentication & user state
│   │   └── useFetch.js                  # Data fetching with TanStack Query
│   │
│   ├── 📁 context/                      # React Context
│   │   └── AuthContext.jsx              # Auth state & user role
│   │
│   ├── 📁 components/                   # Reusable components
│   │   ├── common/                      # Shared UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Table.jsx
│   │   │
│   │   └── layout/                      # Layout wrappers
│   │       ├── AdminLayout.jsx          # Admin pages layout
│   │       ├── ManagerLayout.jsx        # Manager pages layout
│   │       ├── EmployeeLayout.jsx       # Employee pages layout
│   │       └── AuthLayout.jsx           # Login/auth pages layout
│   │
│   ├── 📁 pages/                        # Page components
│   │   ├── auth/                        # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── ChangePassword.jsx
│   │   │
│   │   ├── admin/                       # Admin pages
│   │   │   ├── users/
│   │   │   │   ├── UserList.jsx
│   │   │   │   └── UserForm.jsx         # Create & Edit user
│   │   │   │
│   │   │   └── positions/
│   │   │       ├── PositionList.jsx
│   │   │       └── PositionForm.jsx     # Create & Edit position
│   │   │
│   │   ├── manager/                     # Manager pages
│   │   │   ├── dashboard/
│   │   │   │   └── ManagerDashboard.jsx
│   │   │   │
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeList.jsx
│   │   │   │   └── EmployeeDetail.jsx
│   │   │   │
│   │   │   └── modules/
│   │   │       ├── ModuleList.jsx
│   │   │       ├── ModuleForm.jsx       # Create & Edit module
│   │   │       ├── ModuleDetail.jsx
│   │   │       ├── ModuleItemForm.jsx   # Add/Edit module items
│   │   │       └── ModuleStatusUpdate.jsx
│   │   │
│   │   └── employee/                    # Employee pages
│   │       ├── enrollments/
│   │       │   ├── EnrollmentCurrent.jsx
│   │       │   ├── EnrollmentHistory.jsx
│   │       │   ├── EnrollmentResume.jsx
│   │       │   ├── EnrollmentProgress.jsx
│   │       │   └── EnrollmentChecklist.jsx
│   │       │
│   │       └── submissions/
│   │           ├── SubmissionForm.jsx
│   │           └── SubmissionHistory.jsx
│   │
│   ├── 📁 utils/                        # Helper functions
│   │   ├── formatDate.js                # Date formatting utilities
│   │   └── roleGuard.js                 # Role-based access control
│   │
│   ├── 📁 router/                       # Routing configuration
│   │   └── AppRouter.jsx                # TanStack Router setup
│   │
│   ├── 📁 assets/                       # Static assets
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── 📁 styles/                       # Global styles
│   │   └── global.css                   # Tailwind + custom styles
│   │
│   ├── App.jsx                          # Root component
│   └── main.jsx                         # App entry point
│
├── .env                                 # Environment variables
├── .gitignore
├── eslint.config.js                     # ESLint config
├── tailwind.config.js                   # Tailwind config
├── postcss.config.js                    # PostCSS config
├── vite.config.js                       # Vite config
├── package.json
└── index.html
```

## 🗂️ Architecture Overview

### Folder Explanation

- **`api/`** - Direct API calls using Axios (GET, POST, PUT, DELETE, PATCH)
- **`hooks/`** - Custom hooks untuk auth dan data fetching dengan TanStack Query
- **`context/`** - Global state untuk authentication dan user info
- **`components/`** - Reusable UI components (Button, Input, Table, dll) dan Layout wrappers
- **`pages/`** - Page components berdasarkan role (admin, manager, employee)
- **`utils/`** - Helper functions (format date, debounce, role guard)
- **`router/`** - Routing configuration dengan TanStack Router
- **`assets/`** - Images dan icons
- **`styles/`** - Global CSS dengan Tailwind

### Data Flow

```
User Action → Page Component → useFetch Hook → API Call → Backend
                ↓                    ↓
            UI Update ← TanStack Query Cache Update ← Response
```

## 🛣️ Routing Structure

```
/ → Redirect based on role
├── /login → Public
├── /employee/ → Protected (Employee)
│   ├── dashboard
│   ├── modules
│   ├── modules/:id
│   ├── enrollment
│   └── history
├── /manager/ → Protected (Manager)
│   ├── dashboard
│   ├── modules
│   ├── modules/create
│   ├── modules/:id/edit
│   ├── employees
│   ├── employees/:id
│   └── submissions
└── /admin/ → Protected (Admin)
    ├── dashboard
    ├── users
    ├── users/create
    └── positions
```

## 📱 Responsive Design

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl-2xl)

## 🚨 Error Handling

- API error interceptor for 401/403/500 responses
- Loading states untuk async operations
- Error messages untuk user feedback

## 🎯 User Roles & Permissions

| Feature            | Admin | Manager | Employee |
| ------------------ | ----- | ------- | -------- |
| View Modules       | ✅    | ✅      | ✅       |
| Create Modules     | ❌    | ✅      | ❌       |
| Enroll in Modules  | ❌    | ❌      | ✅       |
| Submit Work        | ❌    | ✅      | ✅       |
| Review Submissions | ❌    | ✅      | ❌       |
| Manage Users       | ✅    | ❌      | ❌       |
| View Dashboard     | ✅    | ✅      | ✅       |
