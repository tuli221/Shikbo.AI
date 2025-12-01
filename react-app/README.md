# Shikhbo.AI - React Application

A modern, fully-featured learning platform built with React.js, Redux Toolkit, Tailwind CSS, and Shadcn/UI.

## 🚀 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/UI (Custom implementation)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup validation
- **Animations**: Framer Motion
- **API Layer**: Axios
- **Notifications**: React Toastify
- **Icons**: Lucide React + React Icons

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Shadcn UI components
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/            # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── StudentDashboard.jsx
│   ├── InstructorDashboard.jsx
│   └── AdminDashboard.jsx
├── layouts/          # Layout components
│   └── MainLayout.jsx
├── store/            # Redux store
│   ├── store.js
│   └── slices/       # Redux slices
│       ├── userSlice.js
│       ├── courseSlice.js
│       └── uiSlice.js
├── utils/            # Utility functions
│   ├── api.js
│   ├── helpers.js
│   ├── animations.js
│   ├── validationSchemas.js
│   └── cn.js
├── routes/           # Route configuration
│   └── AppRoutes.jsx
├── styles/           # Global styles
│   └── index.css
├── App.jsx
└── main.jsx
```

## 🛠️ Installation

1. **Clone the repository or navigate to the react-app folder**

```bash
cd react-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Install additional required packages**

```bash
npm install @hookform/resolvers class-variance-authority clsx tailwind-merge tailwindcss-animate
```

4. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

5. **Start development server**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

The application supports role-based authentication:

- **Students**: Access to course enrollment, learning materials
- **Instructors**: Course management, student analytics
- **Admins**: Full system access and user management

## 🎨 UI Components

Custom Shadcn/UI components included:

- Button (with variants)
- Card
- Input
- Label

All components support Tailwind CSS customization and use the `cn()` utility for class merging.

## 🌐 API Integration

API calls are centralized in `src/utils/api.js`:

- Axios interceptors for authentication
- Error handling with toast notifications
- Modular API endpoint organization

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode support (prepared)
- ✅ Form validation with Yup
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Protected routes
- ✅ Redux state management
- ✅ Lazy loading for performance

## 🔄 State Management

Redux Toolkit slices:

- **userSlice**: Authentication and user profile
- **courseSlice**: Course data and enrollment
- **uiSlice**: UI state (sidebar, theme, notifications)

## 📦 Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🚧 Next Steps

To complete the conversion, you need to:

1. Create the remaining page components:
   - StudentDashboard.jsx
   - InstructorDashboard.jsx
   - AdminDashboard.jsx
   - Courses.jsx
   - CourseDetails.jsx
   - Payment.jsx
   - Chatbot.jsx
   - LearningCenter.jsx

2. Add any missing images to `public/` folder:
   - Shikbo.AI.png (logo)
   - Other course images

3. Set up backend API endpoints

4. Configure environment variables for production

## 📄 License

This project is private and proprietary to Shikhbo.AI.

## 👥 Contributors

- Development Team @ Shikhbo.AI

---

**Note**: This is a converted React application from HTML/CSS/Tailwind project. All original functionality has been preserved and enhanced with modern React patterns.
