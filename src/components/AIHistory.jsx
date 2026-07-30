export default function AIHistory({ history }) {

  if (!history || history.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#111827",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        🕒 AI Chat History
      </h2>

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#1e293b",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <p>
            <strong>Prompt:</strong> {item.prompt}
          </p>

          <p
            style={{
              marginTop: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {item.response}
          </p>

          <small
            style={{
              color: "#94a3b8",
              display: "block",
              marginTop: "10px",
            }}
          >
            {item.time}
          </small>
        </div>
      ))}
    </div>
  );
}
