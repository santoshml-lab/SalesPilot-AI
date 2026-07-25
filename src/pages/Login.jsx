import "../styles/login.css";

export default function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>SalesPilot AI</h1>

        <p>Login to your account</p>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Login
        </button>

      </div>

    </div>
  );
}
