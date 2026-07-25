import "../styles/login.css";

export default function Signup({ setPage }) {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Create Account</h1>

        <p>Join SalesPilot AI</p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button onClick={() => setPage("dashboard")}>
          Create Account
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94a3b8"
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => setPage("login")}
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}
