# Shikhbo.AI React App - Quick Setup Guide

## ✅ Step 1: Install Dependencies

Navigate to the react-app folder and install all dependencies:

```powershell
cd c:\Users\User\Desktop\HTML\react-app
npm install
```

## ✅ Step 2: Copy Required Assets

Copy the logo and other images from the original HTML folder:

```powershell
# Create public folder if it doesn't exist
New-Item -ItemType Directory -Force -Path "public"

# Copy logo
Copy-Item "..\Shikbo.AI.png" -Destination "public\" -Force
```

## ✅ Step 3: Create Environment File

Copy the example environment file:

```powershell
Copy-Item ".env.example" -Destination ".env"
```

Edit `.env` and update the API URL if needed.

## ✅ Step 4: Start Development Server

```powershell
npm run dev
```

The app should open at `http://localhost:5173`

## 📋 What's Completed

✅ Project structure and configuration
✅ Redux Toolkit store with slices
✅ API utilities with Axios
✅ Form validation schemas with Yup
✅ Framer Motion animations
✅ Shadcn UI components (Button, Card, Input, Label)
✅ Navbar and Footer components
✅ Main Layout component
✅ Landing page (fully converted)
✅ Login page (fully converted)
✅ Register page (fully converted)
✅ React Router setup with protected routes

## 🚧 Next Steps - Pages to Create

The following pages need to be created based on your HTML files:

1. **StudentDashboard.jsx** - Convert from StudentDashboard.html
2. **InstructorDashboard.jsx** - Convert from InstructorDashboard.html
3. **AdminDashboard.jsx** - Convert from AdminDashboard.html
4. **Courses.jsx** - Convert from Courses.html
5. **CourseDetails.jsx** - Convert from ViewDetails.html
6. **Payment.jsx** - Convert from Payment.html
7. **Chatbot.jsx** - Convert from Chatbot.html
8. **LearningCenter.jsx** - Convert from Learning center.html
9. **LiveClass.jsx** - Convert from liveclass.html

## 🎯 How to Use This Setup

### Option 1: Request Individual Page Conversion

Ask me to convert specific pages one at a time:
- "Convert StudentDashboard.html to React"
- "Convert Courses.html to React"

### Option 2: Batch Conversion

Ask me to convert multiple related pages:
- "Convert all dashboard pages to React"
- "Convert all course-related pages to React"

### Option 3: Continue Building

Use this as a base and manually add the remaining pages following the established patterns.

## 📂 Project Organization

### Components
- Place reusable components in `src/components/`
- UI primitives go in `src/components/ui/`

### Pages
- Each HTML file becomes a page component in `src/pages/`
- Use functional components with hooks

### State Management
- Add new slices to `src/store/slices/` as needed
- Import and add to store in `src/store/store.js`

### Styling
- Keep Tailwind classes from original HTML
- Use `cn()` utility for conditional classes
- Add custom CSS in `src/styles/index.css`

## 🔧 Common Commands

```powershell
# Install a new package
npm install package-name

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme.

### Adding Components
Use the existing Shadcn UI components as templates.

### API Configuration
Update `src/utils/api.js` for your backend endpoints.

---

**Ready to continue?** Let me know which pages you'd like me to convert next!
