import "../styles/login.css";

export default function Signup({ setPage }) {
  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Create Account</h1>

        <p>Create your SalesPilot AI account</p>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button onClick={() => setPage("dashboard")}>
          Create Account
        </button>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => setPage("login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
