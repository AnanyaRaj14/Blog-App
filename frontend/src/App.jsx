import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/homePage";
import About from "./pages/about_page";
import Login from"./pages/login_page";
import Signup from "./pages/signup_page";
import NotFound from "./pages/notFound";
import Contact from './pages/contact_page'; // Import the Contact page
import PrivateRoute from "./components/PrivateRoute";
import MyBlogs from "./pages/MyBlogs";
import Create from "./pages/CreateBlog";
import CreateBlog from "./pages/CreateBlog";
import ViewBlog from "./pages/ViewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import DeleteBlog from "./pages/DeleteBlog";

function App() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />


          {/* Private Routes */}
          {/* <Route path="/myblogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
          <Route path="/get/:id" element={<PrivateRoute><ViewBlog /></PrivateRoute>} />
          <Route path="/update/:id" element={<PrivateRoute><UpdateBlog /></PrivateRoute>} />
          <Route path="/delete/:id" element={<PrivateRoute><DeleteBlog /></PrivateRoute>} /> */}


          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/get/:id" element={<ViewBlog />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="/delete/:id" element={<DeleteBlog />} />



          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </>
  );
}

export default App
