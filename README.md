<div align="center">

# 🚀 LevelUp Frontend

### Employee Development Management System

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.19-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.12-ff4154?logo=react-query)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Features](#-key-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 About Project

**LevelUp** is a modern web application for managing employee development through a structured training module system. Built with cutting-edge technologies, this application provides a responsive and user-friendly interface for employees, managers, and administrators.

### 🎯 Objectives

- 📚 Facilitate employee learning through structured training modules
- 📊 Provide real-time progress tracking with data visualization
- 👥 Give managers full control to create and manage content
- 🔐 Implement secure role-based access control (RBAC)

---

## ✨ Key Features

<table>
<tr>
<td width="33%" valign="top">

### 👤 **Employee**

- ✅ Browse & enroll modul training
- ✅ Track progress dengan visual indicator
- ✅ Mark items sebagai completed
- ✅ Submit evidence & notes
- ✅ View history enrollments
- ✅ Resume paused enrollments

</td>
<td width="33%" valign="top">

### 👔 **Manager**

- ✅ Create & manage modules
- ✅ Review submissions
- ✅ Dashboard analytics
- ✅ Monitor employee progress
- ✅ Approve/reject submissions
- ✅ Track team development

</td>
<td width="33%" valign="top">

### 👨‍💼 **Admin**

- ✅ Manage users & positions
- ✅ Create/edit user accounts
- ✅ Assign roles & permissions
- ✅ View system-wide data
- ✅ Configure job positions
- ✅ User management dashboard

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Core Technologies

```
React 19.2          →  Modern UI Library
Vite 7.2            →  Lightning-fast Build Tool
TanStack Router     →  Type-safe File-based Routing
TanStack Query      →  Powerful Server State Management
TanStack Table      →  Headless Table Library
```

### UI & Styling

```
Tailwind CSS        →  Utility-first CSS Framework
shadcn/ui           →  High-quality Component Library
Radix UI            →  Accessible Primitives
Lucide React        →  Beautiful Icon Library
Recharts            →  Composable Charting Library
```

### Development Tools

```
ESLint              →  Code Linting
Prettier            →  Code Formatting
PostCSS             →  CSS Processing
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:

- **Node.js** `v18.0+` ([Download](https://nodejs.org/))
- **npm** / **yarn** / **pnpm**
- **Git**

### Installation

```bash
# 1. Clone repository
git clone https://github.com/adinfahru/fe-levelup.git
cd fe-levelup

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env and configure VITE_API_BASE_URL

# 4. Run development server
npm run dev
```

🎉 Open browser at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://localhost:7118/api/v1
```

---

## 📜 Available Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | 🚀 Start development server |
| `npm run build`   | 🏗️ Build for production     |
| `npm run preview` | 👀 Preview production build |
| `npm run lint`    | 🔍 Run ESLint               |

---

## 📁 Project Structure

```
fe-levelup/
├── src/
│   ├── api/              # API service layer
│   ├── components/       # React components
│   │   ├── admin/       # Admin components
│   │   ├── employee/    # Employee components
│   │   ├── manager/     # Manager components
│   │   ├── layout/      # Layout wrappers
│   │   └── ui/          # shadcn/ui components
│   ├── context/         # React Context (Auth)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities & helpers
│   ├── pages/           # Page components
│   ├── routes/          # TanStack Router routes
│   ├── styles/          # Global CSS
│   └── main.jsx         # Entry point
│
├── public/              # Static assets
├── docs/                # Documentation
└── package.json
```

---

## 🗺️ Routing Overview

```
/                        → Home (redirect based on role)
├── /login               → 🔓 Public
│
├── /admin/*             → 🔒 Admin Only
│   ├── /users           → User management
│   ├── /users/create    → Create user
│   └── /positions       → Position management
│
├── /manager/*           → 🔒 Manager Only
│   ├── /dashboard       → Analytics dashboard
│   ├── /modules         → Module management
│   ├── /employees       → Employee oversight
│   └── /submissions     → Review submissions
│
└── /employee/*          → 🔒 Employee Only
    ├── /dashboard       → Personal dashboard
    ├── /enrollments     → Active enrollments
    ├── /modules         → Browse modules
    └── /profile         → Profile & settings
```

---

## 👥 User Roles & Permissions

| Feature               | Admin | Manager | Employee |
| --------------------- | :---: | :-----: | :------: |
| 👁️ View Modules       |  ✅   |   ✅    |    ✅    |
| ➕ Create Modules     |  ❌   |   ✅    |    ❌    |
| 📝 Enroll in Modules  |  ❌   |   ❌    |    ✅    |
| 📤 Submit Work        |  ❌   |   ❌    |    ✅    |
| ✔️ Review Submissions |  ❌   |   ✅    |    ❌    |
| 👤 Manage Users       |  ✅   |   ❌    |    ❌    |
| 📊 View Analytics     |  ✅   |   ✅    |    ✅    |

---

## 🏗️ Architecture Overview

### Data Flow

```
┌─────────────┐
│   User UI   │
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│  React Query    │ ← Cache & State Management
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  API Service    │ ← Auth Headers & Error Handling
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Backend API    │
└─────────────────┘
```

### Key Patterns

- 🔄 **Server State**: TanStack Query
- 🌐 **Client State**: React Context (Auth)
- 🎨 **Styling**: Tailwind CSS + shadcn/ui
- 🛣️ **Routing**: File-based with TanStack Router
- 🔐 **Auth**: JWT Token + Role-based Guards

---

## 📚 Documentation

For complete documentation, please read:

📘 **[DOCS.md](docs/DOCS.md)** - Complete Documentation

Contains:

- ✅ Detailed Setup & Configuration
- ✅ Architecture & Design Patterns
- ✅ API Integration Guide
- ✅ Component Documentation
- ✅ Development Best Practices
- ✅ Deployment Guide
- ✅ Troubleshooting

📗 **[API_DOCS.md](docs/API_DOCS.md)** - API Reference

📕 **[CODE_GUIDE.md](docs/CODE_GUIDE.md)** - Coding Guidelines

---

## 🎨 UI Components

This project uses **shadcn/ui** - a collection of components that can be copied & customized:

- ✅ Accessible (Radix UI)
- ✅ Customizable (Tailwind CSS)
- ✅ Type-safe
- ✅ Dark mode ready

**Available Components:**
Badge, Button, Card, Dialog, Input, Select, Table, Progress, Skeleton, Switch, Textarea, Tooltip, Sidebar, and more.

---

## 🔒 Security Features

- 🔐 JWT Authentication
- 🛡️ Role-based Access Control (RBAC)
- 🚪 Protected Routes
- ⏰ Auto-logout on token expiration
- 🔄 Automatic token refresh
- 🚫 XSS Protection
- 📝 Input validation & sanitization

---

## 📱 Responsive Design

Fully responsive for all device sizes:

- 📱 **Mobile**: `< 640px`
- 📱 **Tablet**: `640px - 1024px`
- 💻 **Desktop**: `> 1024px`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Development Team

Made with ❤️ by the LevelUp Team

---

## 📞 Support

If you have any questions or issues:

- 📧 Email: support@levelup.com
- 💬 Issues: [GitHub Issues](https://github.com/adinfahru/fe-levelup/issues)
- 📖 Docs: [Documentation](docs/DOCS.md)

---

<div align="center">

### ⭐ Star us on GitHub!

**[⬆ Back to Top](#-levelup-frontend)**

_Last Updated: January 2, 2026_

</div>
