import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center justify-center text-center">
        
        {/* Social Media Icons  */}
        <div className="flex gap-6 justify-center mb-4">
          <a
            href="https://twitter.com/AnanyaRaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-110"
            title="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com/in/ananya-raj-796409297/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition-transform transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/AnanyaRaj14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-400 transition-transform transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-700 dark:text-blue-400">TalkTrail</span>. All rights reserved to <span className="text-blue-600 dark:text-blue-400 font-medium">Ananya Raj</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
