import { useState } from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

const Contact = () => {
  // States for form inputs and form submission feedback
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md focus:ring-4 focus:ring-blue-500 hover:bg-blue-700 disabled:bg-gray-400`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Form submission status */}
          {formStatus && (
            <div className="mt-4 text-center text-green-500">
              <p>{formStatus}</p>
            </div>
          )}

          {/* Social Media Icons */}
          <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-700 text-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Connect with me
            </p>
            <div className="flex justify-center gap-6">
              {/* Twitter */}
              <a
                href="https://twitter.com/AnanyaRaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-transform transform hover:scale-110"
                title="Twitter"
              >
                <FaTwitter size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/ananya-raj-796409297/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-transform transform hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AnanyaRaj14"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gray-800 hover:bg-black p-3 rounded-full transition-transform transform hover:scale-110"
                title="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
