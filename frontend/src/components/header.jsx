import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { AppContext } from "./context/Appcontext";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    const userToken = Cookies.get('token');
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-purple-600">
          📝 TalkTrail
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-white focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
              <Link to="/about" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
              <Link to="/login" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
            </>
          ) : (
            <>
              <Link to="/create" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Create</Link>
              <Link to="/myblogs" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">My Blogs</Link>
              <Link to="/update" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Update</Link>
              <Link to="/delete" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Remove</Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden absolute right-4 top-16 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-transform duration-200 origin-top-right z-50 ${menuOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {!user ? (
            <>
              <Link to="/" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
              <Link to="/about" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
              <Link to="/login" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
            </>
          ) : (
            <>
              <Link to="/create" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Create</Link>
              <Link to="/myblogs" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">My Blogs</Link>
              <Link to="/update" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Update</Link>
              <Link to="/delete" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">Remove</Link>
              <button onClick={handleLogout} className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left w-full transition">Logout</button>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left transition"
          >
            {darkMode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
