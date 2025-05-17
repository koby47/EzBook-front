import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api.js";

export default function RegisterPage() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedRole, setSelectedRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await api.register({ ...form, role: selectedRole });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = (provider) => {
    alert(`Redirecting to ${provider} sign-up as ${selectedRole}`);
    // Here, you would trigger OAuth (e.g. Firebase/Auth0) and pass selectedRole along
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={form.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <select
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="user">User</option>
            <option value="manager">Facility Manager</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          or sign up with
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleSocialSignUp("Google")}
            className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100"
          >
            <img src="/google-logo.png" alt="Google" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>

          <button
            onClick={() => handleSocialSignUp("Apple")}
            className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100"
          >
            <img src="/apple-logo.png" alt="Apple" className="h-5 w-5 mr-2" />
            Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
