import { useNavigate, Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate()

  return (
    <div className="login-container">
      <div className="login-card">

        <form className="login-form">
          <input className="input" type="email" placeholder="Enter your email" />
          <input className="input" type="password" placeholder="Enter your password" />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/register/" >Register</Link>
        </p>
      </div>
    </div>

  );
}

export default Login;