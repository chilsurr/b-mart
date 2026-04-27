import Input from "antd/es/input/Input";

function Register() {
  return (
    <div className="register-card">
      {/* <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Sign up to get started</p> */}

      <form className="register-form">
        <Input type="text" placeholder="Enter your full name" />
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Create password" />
        <Input type="password" placeholder="Confirm password" />
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      <p className="login-text">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;