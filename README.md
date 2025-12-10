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
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Headless UI / Radix UI (to be added)
- **Icons**: Lucide React (to be added)
- **Date Handling**: date-fns (to be added)

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
│   ├── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── 📁 assets/                       # Images, fonts, icons
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── 📁 components/                   # Reusable UI components
│   │   ├── common/                      # Shared components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── Badge.jsx
│   │   │
│   │   ├── layout/                      # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── auth/                        # Authentication components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── ChangePasswordForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── modules/                     # Module-related components
│   │   │   ├── ModuleCard.jsx
│   │   │   ├── ModuleList.jsx
│   │   │   ├── ModuleDetail.jsx
│   │   │   ├── CreateModuleForm.jsx
│   │   │   ├── UpdateModuleForm.jsx
│   │   │   └── ModuleItemsList.jsx
│   │   │
│   │   ├── enrollments/                 # Enrollment components
│   │   │   ├── EnrollmentCard.jsx
│   │   │   ├── EnrollmentList.jsx
│   │   │   ├── EnrollmentProgress.jsx
│   │   │   ├── EnrollmentChecklist.jsx
│   │   │   └── SubmitFinalWorkForm.jsx
│   │   │
│   │   ├── submissions/                 # Submission components
│   │   │   ├── SubmissionCard.jsx
│   │   │   ├── SubmissionList.jsx
│   │   │   ├── ReviewSubmissionForm.jsx
│   │   │   └── SubmissionHistory.jsx
│   │   │
│   │   ├── admin/                       # Admin components
│   │   │   ├── UserManagementTable.jsx
│   │   │   ├── CreateUserForm.jsx
│   │   │   ├── UpdateUserForm.jsx
│   │   │   ├── PositionManagementTable.jsx
│   │   │   └── CreatePositionForm.jsx
│   │   │
│   │   └── manager/                     # Manager components
│   │       ├── DashboardStats.jsx
│   │       ├── EmployeeTable.jsx
│   │       ├── EmployeeDetailCard.jsx
│   │       └── SubmissionReviewCard.jsx
│   │
│   ├── 📁 pages/                        # Page components (Routes)
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── employee/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ModuleBrowse.jsx
│   │   │   ├── ModuleDetails.jsx
│   │   │   ├── CurrentEnrollment.jsx
│   │   │   ├── EnrollmentHistory.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── manager/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ModuleManagement.jsx
│   │   │   ├── CreateModule.jsx
│   │   │   ├── EditModule.jsx
│   │   │   ├── EmployeeOverview.jsx
│   │   │   ├── EmployeeDetail.jsx
│   │   │   ├── SubmissionReview.jsx
│   │   │   └── Analytics.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── CreateUser.jsx
│   │   │   ├── EditUser.jsx
│   │   │   └── PositionManagement.jsx
│   │   │
│   │   └── common/
│   │       ├── NotFound.jsx
│   │       └── Unauthorized.jsx
│   │
│   ├── 📁 hooks/                        # Custom React hooks
│   │   ├── useAuth.js                   # Authentication hook
│   │   ├── useLocalStorage.js           # Local storage hook
│   │   ├── useDebounce.js               # Debounce hook
│   │   ├── usePagination.js             # Pagination hook
│   │   └── useToast.js                  # Toast notification hook
│   │
│   ├── 📁 services/                     # API service layer
│   │   ├── api.js                       # Axios instance & interceptors
│   │   ├── auth.service.js              # Auth API calls
│   │   ├── user.service.js              # User management API
│   │   ├── module.service.js            # Module API calls
│   │   ├── enrollment.service.js        # Enrollment API calls
│   │   ├── submission.service.js        # Submission API calls
│   │   ├── position.service.js          # Position API calls
│   │   └── dashboard.service.js         # Dashboard API calls
│   │
│   ├── 📁 queries/                      # TanStack Query hooks
│   │   ├── useAuthQueries.js            # Auth queries & mutations
│   │   ├── useUserQueries.js            # User CRUD queries
│   │   ├── useModuleQueries.js          # Module queries
│   │   ├── useEnrollmentQueries.js      # Enrollment queries
│   │   ├── useSubmissionQueries.js      # Submission queries
│   │   ├── usePositionQueries.js        # Position queries
│   │   └── useDashboardQueries.js       # Dashboard queries
│   │
│   ├── 📁 routes/                       # TanStack Router configuration
│   │   ├── index.jsx                    # Root route config
│   │   ├── auth.routes.jsx              # Auth routes
│   │   ├── employee.routes.jsx          # Employee routes
│   │   ├── manager.routes.jsx           # Manager routes
│   │   └── admin.routes.jsx             # Admin routes
│   │
│   ├── 📁 context/                      # React Context providers
│   │   ├── AuthContext.jsx              # Authentication context
│   │   ├── ThemeContext.jsx             # Theme/dark mode context
│   │   └── ToastContext.jsx             # Toast notification context
│   │
│   ├── 📁 utils/                        # Utility functions
│   │   ├── constants.js                 # App constants
│   │   ├── helpers.js                   # General helpers
│   │   ├── validators.js                # Validation functions
│   │   ├── formatters.js                # Date, number formatters
│   │   ├── storage.js                   # LocalStorage helpers
│   │   └── permissions.js               # Role-based permission checks
│   │
│   ├── 📁 schemas/                      # Zod validation schemas
│   │   ├── auth.schema.js               # Login, password schemas
│   │   ├── user.schema.js               # User creation/update schemas
│   │   ├── module.schema.js             # Module schemas
│   │   ├── enrollment.schema.js         # Enrollment schemas
│   │   └── submission.schema.js         # Submission schemas
│   │
│   ├── 📁 styles/                       # Global styles
│   │   ├── index.css                    # Tailwind imports & global styles
│   │   └── variables.css                # CSS custom properties
│   │
│   ├── App.jsx                          # Root component
│   ├── main.jsx                         # App entry point
│   └── Router.jsx                       # Router setup
│
├── .env                                 # Environment variables
├── .env.example                         # Example environment file
├── .gitignore
├── .prettierrc                          # Prettier config
├── eslint.config.js                     # ESLint config
├── tailwind.config.js                   # Tailwind config
├── postcss.config.js                    # PostCSS config
├── vite.config.js                       # Vite config
├── package.json
├── README.md
└── index.html
```

## 🗂️ Architecture Patterns

### Component Organization

```
Component Types:
├── Pages (Route components)
├── Feature Components (Domain-specific)
├── Common Components (Reusable UI)
└── Layout Components (Structure)
```

### Data Flow

```
User Action → Component → Hook → Query/Mutation → Service → API
                ↓                      ↓
            UI Update ← Cache Update ← Response
```

### State Management Strategy

- **Server State**: TanStack Query (API data, caching, synchronization)
- **Auth State**: Context API + LocalStorage (user, token, role)
- **UI State**: Component state (modals, forms, toggles)
- **Global UI State**: Context API (theme, toast notifications)

## 🔐 Authentication Flow

1. User submits login credentials
2. Backend validates and returns JWT token
3. Token stored in LocalStorage
4. Token attached to all API requests via interceptor
5. On 401 response, redirect to login
6. Token expiration handled by auto-logout

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

## 🔄 API Integration

### Service Layer Pattern

```javascript
// services/module.service.js
import api from './api';

export const moduleService = {
  getAll: (params) => api.get('/modules', { params }),
  getById: (id) => api.get(`/modules/${id}`),
  create: (data) => api.post('/modules', data),
  update: (id, data) => api.put(`/modules/${id}`, data),
  updateStatus: (id, isActive) => api.patch(`/modules/${id}/status`, { isActive }),
};
```

### TanStack Query Integration

```javascript
// queries/useModuleQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moduleService } from '../services/module.service';

export const useModules = (params) => {
  return useQuery({
    queryKey: ['modules', params],
    queryFn: () => moduleService.getAll(params),
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moduleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['modules']);
    },
  });
};
```

## 📦 Dependencies To Install

```bash
# Routing
npm install @tanstack/react-router @tanstack/react-router-devtools

# State Management
npm install @tanstack/react-query @tanstack/react-query-devtools

# HTTP Client
npm install axios

# Form Handling
npm install react-hook-form zod @hookform/resolvers

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# UI Components (choose one)
npm install @headlessui/react @heroicons/react
# OR
npm install @radix-ui/react-* (install specific components)

# Icons
npm install lucide-react

# Utilities
npm install date-fns
npm install clsx tailwind-merge
```

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## 📱 Responsive Design

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl-2xl)

All components should be mobile-first responsive.

## 🚨 Error Handling

- Global error boundary for uncaught errors
- API error interceptor for 401/403/500 responses
- Toast notifications for user feedback
- Form validation with Zod schemas
- Loading states with skeletons

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
