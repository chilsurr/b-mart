import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { postRegist } from "../utils/api";


function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");

    try {
      const response = await postRegist(form)
      // const response = await fetch(
      //   "http://127.0.0.1:8000/api/register/",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(form),
      //   }
      // );

      const data = await response.data;

      if (!response.ok) {
        setErrors(data);
        return;
      }

      setSuccess(
        "Registrasi berhasil. Silakan login."
      );

      setForm({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

    } catch (error) {
      console.error(error);

      setErrors({
        general: "Tidak dapat terhubung ke server.",
      });
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="regist-tittle">
          <div >Register</div>

          {success && (
            <p>{success}</p>
          )}

          {errors.general && (
            <p>{errors.general}</p>
          )}
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />

            {errors.username && (
              <p>{errors.username[0]}</p>
            )}
          </div>

          <div>
            <label>Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p>{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            {errors.password && (
              <p>{errors.password[0]}</p>
            )}
          </div>

          <div>
            <label>Konfirmasi Password</label>
            <input
              className="input"
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
            />

            {errors.password_confirmation && (
              <p>
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;