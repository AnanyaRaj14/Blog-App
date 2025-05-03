import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { AppContext } from "./context/Appcontext";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext)

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    // console.log(storedUser);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  },[]);

  useEffect(() => {
    const userToken = Cookies.get('token');
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUser(decoded);
        console.log(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);
  
  // Load dark mode preference from localStorage
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

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Update state to re-render header
    navigate("/"); // Optional: redirect to home after logout
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">
          📝 BlogApp
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</Link>
              <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Login</Link>
              {/* <Link to="/signup" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Signup</Link> */}
            </>
          ) : (
            <>
              <Link to="/create" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Create</Link>
              <Link to="/myblogs" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">My Blogs</Link>
              <Link to="/update" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Update</Link>
              <Link to="/delete" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Remove</Link>

              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                Logout
              </button>
            </>
          )}

          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded transition"
          >
            {darkMode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
