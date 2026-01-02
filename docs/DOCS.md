# LevelUp Frontend - Complete Documentation

## 📑 Table of Contents

1. [About Project](#about-project)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Configuration](#configuration)
6. [Application Architecture](#application-architecture)
7. [Features by Role](#features-by-role)
8. [Routing System](#routing-system)
9. [API Integration](#api-integration)
10. [State Management](#state-management)
11. [Authentication & Authorization](#authentication--authorization)
12. [Components](#components)
13. [Styling & UI](#styling--ui)
14. [Development Guide](#development-guide)
15. [Best Practices](#best-practices)

---

## About Project

**LevelUp** is an employee development management system built with React. This application allows employees to access, enroll in, and complete training modules, as well as enables managers to create modules, review submissions, and monitor employee progress.

### Main Objectives

- Facilitate employee learning and development through structured modules
- Provide clear and real-time progress tracking system
- Deliver analytics dashboard for managers
- Manage users and positions through admin panel

### Target Users

- **Employee**: Employees who take training modules
- **Manager**: Managers who create modules and review submissions
- **Admin**: Administrators who manage users and positions

---

## Tech Stack

### Core Technologies

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| React           | 19.2.0  | UI Library              |
| Vite            | 7.2.4   | Build tool & dev server |
| TanStack Router | 1.140.5 | File-based routing      |
| TanStack Query  | 5.90.12 | Server state management |
| TanStack Table  | 8.21.3  | Table management        |
| Tailwind CSS    | 3.4.19  | Styling framework       |

### UI Components & Libraries

- **shadcn/ui**: Component library based on Radix UI
- **Lucide React**: Icon library
- **Recharts**: Charting library for dashboard
- **Sonner**: Toast notifications
- **JWT Decode**: Token parsing

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

---

## Project Structure

```
fe-levelup/
├── public/                     # Static assets
├── src/
│   ├── api/                    # API service layer
│   │   ├── auth.api.js
│   │   ├── dashboard.api.js
│   │   ├── enrollment.api.js
│   │   ├── modules.api.js
│   │   ├── positions.api.js
│   │   ├── submission.api.js
│   │   └── users.api.js
│   │
│   ├── components/             # React components
│   │   ├── admin/             # Admin-specific components
│   │   ├── employee/          # Employee-specific components
│   │   ├── manager/           # Manager-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components (shadcn)
│   │
│   ├── context/               # React Context providers
│   │   ├── auth.context.js
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.jsx
│   │   └── useAuth.js
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── api.js            # API utilities & fetch wrapper
│   │   └── utils.js          # General utilities
│   │
│   ├── pages/                 # Page components
│   │   ├── admin/            # Admin pages
│   │   ├── auth/             # Authentication pages
│   │   ├── employee/         # Employee pages
│   │   ├── manager/          # Manager pages
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/               # Route definitions
│   │   ├── _admin/          # Admin routes
│   │   ├── _employee/       # Employee routes
│   │   ├── _manager/        # Manager routes
│   │   ├── __root.jsx       # Root layout
│   │   ├── _admin.jsx       # Admin layout route
│   │   ├── _employee.jsx    # Employee layout route
│   │   ├── _manager.jsx     # Manager layout route
│   │   ├── index.jsx        # Home route
│   │   └── login.jsx        # Login route
│   │
│   ├── styles/
│   │   └── global.css        # Global styles
│   │
│   ├── main.jsx              # Application entry point
│   └── routeTree.gen.ts      # Auto-generated route tree
│
├── docs/                      # Documentation
├── components.json            # shadcn/ui config
├── eslint.config.js          # ESLint configuration
├── jsconfig.json             # JavaScript config
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS config
├── tailwind.config.js        # Tailwind config
├── vite.config.js            # Vite configuration
└── README.md                 # Project readme
```

### Structure Explanation

#### `/src/api/`

Contains service layer for communication with backend API. Each file represents one domain/resource.

#### `/src/components/`

- **admin/**: Admin-specific components (users, positions management)
- **employee/**: Employee components (module cards, progress tracking)
- **manager/**: Manager components (module creation, submission review)
- **layout/**: Layout wrapper for each role
- **ui/**: Reusable UI components from shadcn/ui

#### `/src/routes/`

File-based routing using TanStack Router. File structure determines URL routing.

---

## Setup & Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation Steps

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd fe-levelup
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create `.env` file in project root:

   ```env
   VITE_API_BASE_URL=https://localhost:7118/api/v1
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Application will run at `http://localhost:5173`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## Configuration

### Environment Variables

```env
# Backend API Base URL
VITE_API_BASE_URL=https://localhost:7118/api/v1
```

### Vite Configuration (`vite.config.js`)

```javascript
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite(), // Auto-generate route tree
    react(), // React support
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Path alias
    },
  },
});
```

### Tailwind Configuration

File: `tailwind.config.js`

- Custom color scheme
- Custom animations
- Dark mode support
- Plugin configuration

### ESLint Configuration

File: `eslint.config.js`

- React best practices
- React Hooks rules
- React Refresh rules
- Prettier integration

---

## Application Architecture

### Application Flow

```
Entry Point (main.jsx)
    ↓
QueryClientProvider (React Query)
    ↓
AuthProvider (Authentication Context)
    ↓
RouterProvider (TanStack Router)
    ↓
Route-based Layout (Admin/Manager/Employee)
    ↓
Page Component
    ↓
Feature Components
```

### Data Flow

1. **Component** → Request data via React Query
2. **React Query** → Call API service function
3. **API Service** → Make HTTP request with auth headers
4. **Backend API** → Process request
5. **Response** → Handle in API service
6. **React Query** → Cache & return data
7. **Component** → Render UI

### Authentication Flow

```
Login Page
    ↓
Submit Credentials
    ↓
API Call (authAPI.login)
    ↓
Receive JWT Token
    ↓
Store in localStorage (token + user data)
    ↓
Update AuthContext
    ↓
Redirect based on role
    ↓
Protected Routes (verify token)
    ↓
Auto-logout on token expiration
```

---

## Features by Role

### 👨‍💼 Admin Features

**User Management**

- ✅ View all users (table with pagination & search)
- ✅ Create new user
- ✅ Edit user details
- ✅ View user detail
- ✅ Delete user

**Position Management**

- ✅ View all positions
- ✅ Create new position
- ✅ Edit position
- ✅ Delete position

**Access**: `/admin/users`, `/admin/positions`

### 👔 Manager Features

**Dashboard Analytics**

- ✅ Statistics overview (total modules, enrollments, submissions)
- ✅ Charts & visualizations
- ✅ Enrolled employees table
- ✅ Idle employees tracking
- ✅ Detailed modal for employee progress

**Module Management**

- ✅ View all modules
- ✅ Create module with sections & items
- ✅ Edit module
- ✅ View module details
- ✅ Delete module

**Employee Management**

- ✅ View all employees
- ✅ Assign/enroll employee to module
- ✅ View employee detail & progress

**Submission Review**

- ✅ View pending submissions
- ✅ Review submission detail
- ✅ Approve submission
- ✅ Reject submission with feedback

**Access**: `/manager/dashboard`, `/manager/modules`, `/manager/employees`, `/manager/submissions`

### 👤 Employee Features

**Dashboard**

- ✅ Active enrollment with progress indicator
- ✅ Module completion tracking

**Enrollments**

- ✅ View active enrollments
- ✅ View history (completed & paused)
- ✅ Resume paused enrollment

**Modules**

- ✅ Browse available modules
- ✅ View module details
- ✅ Enroll to module
- ✅ Track module items (mark as completed)
- ✅ Add evidence/notes per item
- ✅ Submit final work

**Profile**

- ✅ View profile
- ✅ Change password

**Access**: `/employee/dashboard`, `/employee/enrollments`, `/employee/modules`

---

## Routing System

### TanStack Router

This project uses **file-based routing** with TanStack Router.

### Route Structure

```
/                           → Home (index.jsx)
/login                      → Login (login.jsx)

/admin/*                    → Admin Layout (_admin.jsx)
  /admin/users              → Users List
  /admin/users/create       → Create User
  /admin/users/:id          → User Detail
  /admin/users/edit/:id     → Edit User
  /admin/positions          → Positions List
  /admin/positions/create   → Create Position
  /admin/positions/edit/:id → Edit Position

/manager/*                  → Manager Layout (_manager.jsx)
  /manager/dashboard        → Dashboard
  /manager/modules          → Modules List
  /manager/modules/:id      → Module Detail
  /manager/modules/create   → Create Module
  /manager/modules/edit/:id → Edit Module
  /manager/employees        → Employees List
  /manager/employees/:id    → Employee Detail
  /manager/submissions      → Submissions List

/employee/*                 → Employee Layout (_employee.jsx)
  /employee/dashboard       → Dashboard
  /employee/enrollments     → Enrollments List
  /employee/enrollments/:id → Enrollment Detail
  /employee/modules         → Modules List
  /employee/modules/:id     → Module Detail
```

### Protected Routes

All routes in `/admin/*`, `/manager/*`, and `/employee/*` are protected routes that require:

1. Valid JWT token
2. Appropriate role

### Route Guards

Implementation in layout routes (`_admin.jsx`, `_manager.jsx`, `_employee.jsx`):

```jsx
// Example: _manager.jsx
export const Route = createFileRoute('/_manager')({
  beforeLoad: async ({ context, location }) => {
    const { queryClient } = context;
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user || user.role !== 'Manager') {
      throw redirect({ to: '/login' });
    }
  },
  component: ManagerLayout,
});
```

---

## API Integration

### API Base Configuration

File: `/src/lib/api.js`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';
```

### Authentication Headers

Every request automatically includes JWT token:

```javascript
export const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
```

### API Services

#### Auth API (`/src/api/auth.api.js`)

```javascript
authAPI.login({ email, password });
authAPI.changePassword({ currentPassword, newPassword });
```

#### Users API (`/src/api/users.api.js`)

```javascript
usersAPI.getUsers({ searchTerm, positionId, sortBy, pageNumber, pageSize });
usersAPI.getUserById(id);
usersAPI.createUser(userData);
usersAPI.updateUser(id, userData);
usersAPI.deleteUser(id);
```

#### Positions API (`/src/api/positions.api.js`)

```javascript
positionsAPI.getPositions();
positionsAPI.getPositionById(id);
positionsAPI.createPosition(positionData);
positionsAPI.updatePosition(id, positionData);
positionsAPI.deletePosition(id);
```

#### Modules API (`/src/api/modules.api.js`)

```javascript
modulesAPI.getModules();
modulesAPI.getModuleById(id);
modulesAPI.createModule(moduleData);
modulesAPI.updateModule(id, moduleData);
modulesAPI.deleteModule(id);
```

#### Enrollment API (`/src/api/enrollment.api.js`)

```javascript
enrollmentAPI.getEnrollments({ status });
enrollmentAPI.getEnrollmentById(id);
enrollmentAPI.enrollModule(moduleId);
enrollmentAPI.updateProgress(enrollmentId, itemId, data);
enrollmentAPI.submitWork(enrollmentId, data);
```

#### Dashboard API (`/src/api/dashboard.api.js`)

```javascript
dashboardAPI.getManagerStats();
dashboardAPI.getEnrolledEmployees();
dashboardAPI.getIdleEmployees();
```

#### Submission API (`/src/api/submission.api.js`)

```javascript
submissionAPI.getSubmissions({ status });
submissionAPI.getSubmissionById(id);
submissionAPI.approveSubmission(id);
submissionAPI.rejectSubmission(id, feedback);
```

### Error Handling

API errors are handled consistently:

1. **401/403 (Unauthorized)**: Auto redirect to `/login`
2. **400 (Bad Request)**: Return error message
3. **404 (Not Found)**: Return error message
4. **500 (Server Error)**: Generic error message

```javascript
export const handleResponse = async (response) => {
  if (isAuthError(response.status)) {
    handleAuthError();
    throw new Error('AUTH_ERROR');
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};
```

---

## State Management

### React Query (TanStack Query)

Used for **server state management**.

#### Query Configuration

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

#### Query Usage

```javascript
// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['modules'],
  queryFn: modulesAPI.getModules,
});

// Fetch with params
const { data } = useQuery({
  queryKey: ['users', { searchTerm, positionId }],
  queryFn: () => usersAPI.getUsers({ searchTerm, positionId }),
});
```

#### Mutation Usage

```javascript
const mutation = useMutation({
  mutationFn: modulesAPI.createModule,
  onSuccess: () => {
    queryClient.invalidateQueries(['modules']);
    toast.success('Module created successfully');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

// Trigger mutation
mutation.mutate(moduleData);
```

### Context API

Used for **client state management** (Authentication).

#### AuthContext

```javascript
const { user, login, logout, isAuthenticated } = useAuth();

// Login
await login({ email, password });

// Logout
logout();

// Check auth
if (isAuthenticated()) {
  // User is logged in
}

// Get user info
console.log(user.role); // 'Admin' | 'Manager' | 'Employee'
```

---

## Authentication & Authorization

### JWT Token Management

#### Login Flow

1. User submits credentials
2. API returns JWT token + user data
3. Store in localStorage:
   ```javascript
   localStorage.setItem('token', token);
   localStorage.setItem('user', JSON.stringify(userData));
   ```
4. Update AuthContext state
5. Redirect based on role

#### Token Storage

```javascript
// Token structure in localStorage
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    email: "user@example.com",
    role: "Manager",
    firstName: "John",
    lastName: "Doe",
    expiresAt: "2026-01-03T10:00:00Z"
  }
}
```

#### Auto Logout on Token Expiration

```javascript
useEffect(() => {
  const checkTokenExpiration = () => {
    if (user && isTokenExpired()) {
      logout();
    }
  };

  checkTokenExpiration();
  const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

  return () => clearInterval(interval);
}, [user]);
```

### Role-Based Access Control (RBAC)

#### Route Protection

Each layout route has `beforeLoad` guard:

```javascript
// Admin routes
beforeLoad: ({ context }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'Admin') {
    throw redirect({ to: '/login' });
  }
};

// Manager routes
beforeLoad: ({ context }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'Manager') {
    throw redirect({ to: '/login' });
  }
};

// Employee routes
beforeLoad: ({ context }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'Employee') {
    throw redirect({ to: '/login' });
  }
};
```

#### Component-Level Protection

```javascript
import { useAuth } from '@/hooks/useAuth';

function ProtectedComponent() {
  const { user } = useAuth();

  if (user.role !== 'Manager') {
    return <div>Access Denied</div>;
  }

  return <div>Protected Content</div>;
}
```

---

## Komponen

### Layout Components

#### AdminLayout (`/src/components/layout/AdminLayout.jsx`)

- Sidebar navigation for admin
- Header with user info
- Content area

#### ManagerLayout (`/src/components/layout/ManagerLayout.jsx`)

- Sidebar with menu: Dashboard, Modules, Employees, Submissions
- Responsive mobile menu

#### EmployeeLayout (`/src/components/layout/EmployeeLayout.jsx`)

- Sidebar with menu: Dashboard, Enrollments, Modules, Profile
- Progress indicator in header

### Admin Components

#### UsersTable

- Display users with pagination
- Search & filter by position
- Sort functionality
- Actions: View, Edit, Delete

#### UserForm

- Form for create/edit user
- Validation
- Role & position selection

#### PositionsTable

- Display positions
- CRUD operations

#### PositionForm

- Form for create/edit position

### Manager Components

#### DashboardStats

- Display statistics cards
- Total modules, enrollments, submissions

#### DashboardCharts

- Recharts for data visualization
- Bar chart, line chart, pie chart

#### ModuleFormCreate/Edit

- Form for create/edit module
- Dynamic sections & items
- File upload support

#### SubmissionCard

- Display submission list
- Status badge
- Quick actions

#### SubmissionDetailCard

- Detailed submission view
- Approve/reject buttons
- Feedback form

### Employee Components

#### ModuleCard

- Display module information
- Enroll button
- Progress indicator

#### ModuleProgressCard

- Track module progress
- Percentage completion
- Status badge

#### ActiveSectionCard

- Display section items
- Checkbox to mark completed
- Evidence input

### UI Components (shadcn/ui)

Reusable components from shadcn/ui:

- **Button**: Primary, secondary, outline variants
- **Card**: Container with header, content, footer
- **Dialog**: Modal dialogs
- **Input**: Text input with label
- **Select**: Dropdown select
- **Table**: Data table structure
- **Badge**: Status badges
- **Progress**: Progress bar
- **Skeleton**: Loading skeleton
- **Switch**: Toggle switch
- **Textarea**: Multi-line text input
- **Tooltip**: Hover tooltips
- **Separator**: Divider line
- **Sheet**: Slide-out panel
- **Sidebar**: Navigation sidebar

---

## Styling & UI

### Tailwind CSS

Using utility-first CSS framework.

#### Custom Theme

File: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      // ... custom colors
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      // ... custom animations
    }
  }
}
```

#### Global Styles

File: `/src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... CSS variables */
  }
}
```

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Responsive sidebar (collapsible on mobile)
- Responsive tables (horizontal scroll)

### Dark Mode Support

Dark mode configuration through CSS variables and Tailwind.

---

## Development Guide

### Adding New Feature

1. **Create API service** in `/src/api/`
2. **Create components** in `/src/components/`
3. **Create page** in `/src/pages/`
4. **Create route** in `/src/routes/`
5. **Add to navigation** in layout component

### Adding New Route

1. Create file in `/src/routes/` with naming convention:
   - `_layout.jsx`: Layout route
   - `route.jsx`: Standard route
   - `route.$id.jsx`: Dynamic route
   - `route.index.jsx`: Index route

2. TanStack Router auto-generates route tree

3. Implement `beforeLoad` for auth guard if needed

### Adding New Component

1. Create component file in appropriate folder
2. Export component
3. Import and use in page/parent component

### Using React Query

```javascript
// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => api.getResource(id),
});

// Mutation
const mutation = useMutation({
  mutationFn: api.createResource,
  onSuccess: () => {
    queryClient.invalidateQueries(['resource']);
  },
});
```

### Using shadcn/ui Components

```bash
# Add new component
npx shadcn@latest add button

# Component will be added to /src/components/ui/
```

---

## Best Practices

### Code Organization

✅ **DO**:

- Use functional components
- Use hooks for state management
- Separate business logic from presentation
- Use custom hooks for reusable logic
- Create small and reusable components

❌ **DON'T**:

- Don't put business logic in component
- Don't create mega components
- Don't hardcode values

### API Calls

✅ **DO**:

- Use React Query for server state
- Handle loading & error states
- Invalidate queries after mutation
- Use optimistic updates for better UX

❌ **DON'T**:

- Don't fetch in useEffect without cleanup
- Don't directly update state from API response

### State Management

✅ **DO**:

- Use React Query for server state
- Use Context for global client state
- Use local state for UI state
- Minimize state dependencies

❌ **DON'T**:

- Don't store server data in Context
- Don't prop drill more than 2-3 levels

### Styling

✅ **DO**:

- Use Tailwind utility classes
- Use custom components from shadcn/ui
- Be consistent with spacing & colors
- Mobile-first responsive design

❌ **DON'T**:

- Don't use inline styles
- Don't create custom CSS unless absolutely necessary

### Performance

✅ **DO**:

- Use React.memo for expensive components
- Lazy load routes & components
- Optimize images
- Use pagination for large lists

❌ **DON'T**:

- Don't render large lists without virtualization
- Don't fetch all data at once

### Security

✅ **DO**:

- Validate user input
- Sanitize data before rendering
- Use HTTPS in production
- Implement proper RBAC
- Clear sensitive data on logout

❌ **DON'T**:

- Don't store sensitive data in localStorage
- Don't trust client-side validation alone

---

## Troubleshooting

### Common Issues

#### 1. "Token expired" or auto logout

**Solution**:

- Check token expiration in backend
- Implement refresh token mechanism
- Adjust `staleTime` in React Query config

#### 2. Route not found after deployment

**Solution**:

- Configure server for SPA routing
- Add `_redirects` file for Netlify
- Add `.htaccess` for Apache

#### 3. CORS errors

**Solution**:

- Configure CORS in backend
- Check `VITE_API_BASE_URL` environment variable

#### 4. Component not updating after mutation

**Solution**:

- Invalidate queries in `onSuccess`:
  ```javascript
  onSuccess: () => {
    queryClient.invalidateQueries(['resource']);
  };
  ```

#### 5. Build errors

**Solution**:

- Run `npm install` again
- Clear `node_modules` and reinstall
- Check Node.js version compatibility

---

## Resources & Links

### Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

### Tools

- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [TanStack Router DevTools](https://tanstack.com/router/latest/docs/framework/react/devtools)

---

## Contributors

- Development Team
- UI/UX Designers
- QA Team

---

## License

[Specify your license here]

---

**Last Updated**: January 2, 2026

---

## Appendix

### Environment Setup Checklist

- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with `VITE_API_BASE_URL`
- [ ] Backend API running
- [ ] Development server running (`npm run dev`)

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Build successful (`npm run build`)
- [ ] Preview checked (`npm run preview`)
- [ ] API endpoints tested
- [ ] Authentication flow tested
- [ ] RBAC tested for all roles
- [ ] Responsive design verified
- [ ] Performance optimized

---

_This documentation will be continuously updated as the project evolves._
