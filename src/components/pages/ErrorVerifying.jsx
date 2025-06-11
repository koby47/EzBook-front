import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorVerifying = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4"
    >
      <motion.h1
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-700"
      >
        🚫 Error Verifying Email
      </motion.h1>
      <p className="mt-4 text-gray-600">
        Something went wrong while verifying your email. Please try again later.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </motion.div>
  );
};

export default ErrorVerifying;
