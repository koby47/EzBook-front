import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { auth, provider, signInWithPopup } from "../../../services/firebase"; // adjust path based on your structure

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api.login(formData);
      if (data.user.role === "admin") {
        throw new Error("Not authorized to access");
      }
      login(data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const credential = await googleUser.getIdToken();

      // Send token to backend
      const data = await api.loginWithGoogle(credential);

      if (data.user.role === "admin") {
        throw new Error("Not authorized to access");
      }

      login(data.user);
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>

        <div className="text-center text-gray-500">or</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Only <span className="font-medium">User</span> and <span className="font-medium">Manager</span> roles can log in here.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
