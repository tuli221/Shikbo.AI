import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Menu, X } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuthenticated, selectUserRole, logout } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userRole = useSelector(selectUserRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/courses?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const getDashboardLink = () => {
    switch (userRole) {
      case 'student':
        return '/student-dashboard'
      case 'instructor':
        return '/instructor-dashboard'
      case 'admin':
        return '/admin-dashboard'
      default:
        return '/login'
    }
  }

  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white/80 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link to="/" className="inline-block">
          <img src="/Shikbo.AI.png" alt="Shikhbo.AI Logo" className="h-10 w-auto" />
        </Link>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white/90 rounded-lg shadow px-2 ml-4"
        >
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-3 py-2 text-sm text-gray-700 bg-transparent outline-none"
          />
          <button
            type="submit"
            className="ml-2 text-white bg-primary hover:bg-secondary px-3 py-2 rounded-md transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button
          className="md:hidden ml-2 p-2 rounded-md bg-white/90"
          aria-label="Open search"
        >
          <Search className="w-5 h-5 text-secondary" />
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 font-medium items-center">
        <li>
          <Link to="/" className="hover:text-secondary transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/courses" className="hover:text-secondary transition">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/learning-center" className="hover:text-secondary transition">
            Learning Center
          </Link>
        </li>
        <li>
          <Link to="/instructors" className="hover:text-secondary transition">
            Instructors
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="hover:text-secondary transition">
            Leaderboard
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to={getDashboardLink()}>
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <Button className="bg-primary text-white hover:bg-secondary transition">
                Log in / Registration
              </Button>
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
        >
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="block py-2 hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/learning-center"
                className="block py-2 hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learning Center
              </Link>
            </li>
            <li>
              <Link
                to="/instructors"
                className="block py-2 hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructors
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="block py-2 hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </li>
            <li className="pt-2 border-t">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary text-white">
                    Log in / Registration
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
