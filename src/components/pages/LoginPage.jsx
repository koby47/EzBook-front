import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api.js";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await api.login(form);
      if (res?.token) {
        const role = res.user?.role;
        if (role === "admin") {
          return setError("Admins must use the admin login page.");
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Welcome back 👋</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign in to your EzBook account</p>

        {error && <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login for User/Manager */}
        <div className="mt-6 text-center text-sm text-gray-500">or sign in with</div>
        <div className="mt-4 space-y-2">
          <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100">
            <img src="/google-logo.png" alt="Google" className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100">
            <img src="/apple-logo.png" alt="Apple" className="h-5 w-5 mr-2" />
            Sign in with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
