import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { auth, provider, signInWithPopup } from "../../../services/firebase";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.login(formData);
      if (data.user.role === "admin") throw new Error("Not authorized to access");

      login(data);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message); // Log only
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const credential = await googleUser.getIdToken();

      const data = await api.loginWithGoogle(credential);
      if (data.user.role === "admin") throw new Error("Not authorized to access");

      login(data);
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err.message); // Log only
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Removed error display here */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-center text-gray-500">or</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Only <span className="font-medium">User</span> and <span className="font-medium">Manager</span> roles can log in here.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
