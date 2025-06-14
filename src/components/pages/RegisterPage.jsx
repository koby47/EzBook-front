import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { auth, provider, signInWithPopup } from "../../../services/firebase";
import { api } from "../../../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // default
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await api.register(formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const credential = await googleUser.getIdToken();

      const data = await api.loginWithGoogle(credential,formData.role); 

      //store token and user info
      localStorage.setItem("token",data.token);//required for protected API access
      login(data.user);//Your AuthContext login method
      toast.success("Google sign-up successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>

        <div className="text-center text-gray-500">or</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;