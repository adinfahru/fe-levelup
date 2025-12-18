# LevelUp Frontend - Code Guide

## 📁 Project Structure

```
src/
├── routes/              # Route definitions (file-based routing)
│   ├── __root.jsx       # Root layout & global setup
│   ├── index.jsx        # Homepage (/)
│   ├── login.jsx        # Login page (/login)
│   ├── _admin.jsx       # Admin layout (underscore = layout route)
│   ├── _admin/          # Admin routes under /admin/*
│   ├── _manager.jsx     # Manager layout
│   ├── _manager/        # Manager routes under /manager/*
│   ├── _employee.jsx    # Employee layout
│   └── _employee/       # Employee routes under /employee/*
│
├── pages/               # Page components (main content)
│   ├── Home.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── ChangePassword.jsx
│   ├── admin/
│   │   ├── users/
│   │   └── positions/
│   ├── manager/
│   │   ├── dashboard/
│   │   ├── employees/
│   │   └── modules/
│   └── employee/
│       ├── enrollments/
│       └── submissions/
│
├── components/          # Reusable components
│   ├── layout/          # Layout components
│   │   ├── AdminLayout.jsx
│   │   ├── ManagerLayout.jsx
│   │   ├── EmployeeLayout.jsx
│   │   └── AuthLayout.jsx
│   └── common/          # Common UI components
│       ├── Button.jsx
│       └── Input.jsx
│
├── api/                 # API calls
│   ├── auth.api.js
│   └── modules.api.js
│
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   └── useFetch.js
│
├── utils/               # Utility functions
│   ├── formatDate.js
│   └── roleGuard.js
│
├── context/             # React Context
│   ├── AuthContext.js
│   └── AuthContext.jsx
│
├── main.jsx             # App entry point
├── App.jsx              # Root component
└── routeTree.gen.ts     # Auto-generated (DO NOT EDIT)
```

---

## 🚀 How to Add a New Page

### Example 1: Simple Page (`/about`)

#### Step 1: Create Page Component
`src/pages/About.jsx`
```jsx
export default function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About Us</h1>
      <p>Welcome to LevelUp - Employee Development System</p>
    </div>
  );
}
```

#### Step 2: Create Route File
`src/routes/about.jsx`
```jsx
import { createFileRoute } from '@tanstack/react-router'
import About from '../pages/About'

export const Route = createFileRoute('/about')({
  component: About,
})
```

#### Step 3: Done!
Access at: `http://localhost:5173/about` ✅

---

### Example 2: Nested Route with Layout (`/admin/settings`)

#### Step 1: Create Page Component
`src/pages/admin/settings/Settings.jsx`
```jsx
import { Link } from '@tanstack/react-router';

export default function Settings() {
  return (
    <div>
      <h1>Admin Settings</h1>
      <p>Manage system settings</p>
      <Link to="/admin/users">Back to Users</Link>
    </div>
  );
}
```

#### Step 2: Create Route File
`src/routes/_admin/admin.settings.jsx`
```jsx
import { createFileRoute } from '@tanstack/react-router'
import Settings from '../../pages/admin/settings/Settings'

export const Route = createFileRoute('/_admin/admin/settings')({
  component: Settings,
})
```

#### Result:
- URL: `/admin/settings`
- Layout: Uses `_admin.jsx` layout (with admin navigation)
- Component: Renders `Settings.jsx`

---

### Example 3: Dynamic Route (`/users/:id`)

#### Step 1: Create Page Component
`src/pages/users/UserDetail.jsx`
```jsx
import { useParams, Link } from '@tanstack/react-router';

export default function UserDetail() {
  const { id } = useParams({ from: '/users/$id' });
  
  return (
    <div>
      <h1>User Detail - ID: {id}</h1>
      <p>Showing details for user {id}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
}
```

#### Step 2: Create Route File
`src/routes/users.$id.jsx`
```jsx
import { createFileRoute } from '@tanstack/react-router'
import UserDetail from '../pages/users/UserDetail'

export const Route = createFileRoute('/users/$id')({
  component: UserDetail,
})
```

#### Access:
- `/users/1` → Shows user 1
- `/users/123` → Shows user 123

---

## 📝 Route File Naming Convention

| File Name | URL | Description |
|-----------|-----|-------------|
| `index.jsx` | `/` | Homepage |
| `about.jsx` | `/about` | Simple route |
| `_admin.jsx` | - | Layout only (no URL) |
| `_admin/admin.users.jsx` | `/admin/users` | Route with layout |
| `users.$id.jsx` | `/users/:id` | Dynamic parameter |
| `posts.$postId.comments.$commentId.jsx` | `/posts/:postId/comments/:commentId` | Multiple params |

**Rules:**
- **Underscore prefix** (`_admin`) = Layout route (tidak jadi URL)
- **Dollar sign** (`$id`) = Dynamic parameter
- **Dot notation** (`admin.users`) = Path separator

---

## 🔗 Navigation Between Pages

### Using `Link` Component
```jsx
import { Link } from '@tanstack/react-router';

<Link to="/about">About Us</Link>
<Link to="/admin/users">View Users</Link>
<Link to="/users/123">View User 123</Link>
```

### Using `useNavigate` Hook
```jsx
import { useNavigate } from '@tanstack/react-router';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate({ to: '/admin/users' });
  };
  
  return <button onClick={handleClick}>Go to Users</button>;
}
```

---

## 🎨 Creating Layouts

Layouts wrap multiple pages with shared UI (navbar, sidebar, etc.)

### Example: Create Admin Layout

`src/components/layout/AdminLayout.jsx`
```jsx
import { Link, Outlet } from '@tanstack/react-router';

export default function AdminLayout() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>Admin Panel</h2>
        <Link to="/admin/users" style={{ marginRight: '1rem' }}>
          Users
        </Link>
        <Link to="/admin/positions">Positions</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```

`src/routes/_admin.jsx`
```jsx
import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../components/layout/AdminLayout'

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
})
```

Now all routes in `_admin/` will use this layout!

---

## 📡 API Calls with TanStack Query

### Example: Fetch Users List

`src/api/users.api.js`
```js
const API_URL = import.meta.env.VITE_API_URL;

export const usersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
};
```

`src/pages/admin/users/UserList.jsx`
```jsx
import { useQuery } from '@tanstack/react-query';
import { usersAPI } from '../../../api/users.api';

export default function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersAPI.getAll,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔧 Common Patterns

### 1. Loading States
```jsx
const { data, isLoading } = useQuery({ ... });

if (isLoading) return <div>Loading...</div>;
```

### 2. Error Handling
```jsx
const { data, error } = useQuery({ ... });

if (error) return <div>Error: {error.message}</div>;
```

### 3. Conditional Rendering
```jsx
{data?.length > 0 ? (
  <ul>{data.map(item => ...)}</ul>
) : (
  <p>No data available</p>
)}
```

### 4. Getting Route Parameters
```jsx
import { useParams } from '@tanstack/react-router';

const { id } = useParams({ from: '/users/$id' });
```

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## ⚠️ Important Notes

1. **DO NOT EDIT** `src/routeTree.gen.ts` - It's auto-generated
2. **Add to `.gitignore`**: `src/routeTree.gen.ts`
3. **Route files** must export `Route` with `createFileRoute()`
4. **Layout routes** start with underscore (`_admin.jsx`)
5. **Plugin auto-updates** routes when you save files

---

## 📚 Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching
- **Tailwind CSS v3** - Styling
- **Lucide React** - Icons

---

## 🎯 Quick Reference

### Create New Feature Flow:
1. ✅ Create page component in `pages/`
2. ✅ Create route file in `routes/`
3. ✅ Plugin auto-generates route tree
4. ✅ Test in browser
5. ✅ Add API calls if needed
6. ✅ Style with Tailwind CSS

---

## 📖 Further Reading

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
