import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axios-instance";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/login/", {
        username: form.username,
        password: form.password,
        application: "ecommerce",
      });

      console.log("Login berhasil:", response.data);

      const {
        access,
        refresh,
        role,
        application,
      } = response.data;

      // Simpan token
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Simpan informasi user
      localStorage.setItem("role", role);
      localStorage.setItem("application", application);

      // Redirect berdasarkan role
      if (role === "ADMIN") {
        navigate("/");
      } else if (role === "CUSTOMER") {
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        const data = error.response.data;

        if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError("Username atau password salah.");
        }
      } else {
        setError("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="regist-tittle">
        <div>Login</div>
      </div>

      <div className="login-card">

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <input
            className="input"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register/">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;