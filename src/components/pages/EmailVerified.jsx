import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmailVerified = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4"
    >
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-blue-700"
      >
        ✅ Email Verified!
      </motion.h1>
      <p className="mt-4 text-gray-600">
        Your email has been successfully verified. You can now log in to your account.
      </p>
      <Link
        to="/login"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </motion.div>
  );
};

export default EmailVerified;
