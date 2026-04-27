

function Login() {
  return (

    <div className="login-card">

      <form className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="register-text">
        Don’t have an account? <a href="#">Register</a>
      </p>
    </div>

  );
}

export default Login;