import "../styles/customers.css";

export default function AIAssistant() {
  return (
    <div className="customers-page">

      <h1>🤖 AI Sales Assistant</h1>

      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Ask AI to generate emails, sales pitches, follow-ups and summaries.
      </p>

      <textarea
        placeholder="Ask AI anything..."
        style={{
          width: "100%",
          height: "180px",
          padding: "15px",
          borderRadius: "12px",
          background: "#1e293b",
          color: "white",
          border: "1px solid rgba(255,255,255,.1)"
        }}
      />

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

    </div>
  );
}
