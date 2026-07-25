import "../styles/login.css";

export default function Login({ setPage }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>SalesPilot AI</h1>

        <p>Login to your account</p>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button onClick={() => setPage("dashboard")}>
          Login
        </button>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => setPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

