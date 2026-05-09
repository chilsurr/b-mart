import { useNavigate, Link } from "react-router-dom";


function Register() {
  const navigate = useNavigate()

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="regist-tittle">
          <div >Register</div>
        </div>

        <form className="register-form">
          <input className="input" type="text" placeholder="Enter your full name" />
          <input className="input" type="email" placeholder="Enter your email" />
          <input className="input" type="password" placeholder="Create password" />
          <input className="input" type="password" placeholder="Confirm password" />
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