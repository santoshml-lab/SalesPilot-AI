export default function AIResponseCard({
  response,
  generateAI,
}) {

  if (!response) return null;

  return (
    <div
      style={{
        marginTop: "25px",
        background: "#111827",
        borderRadius: "15px",
        padding: "25px",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >

      <h2 style={{ marginBottom: "15px" }}>
        ✉️ AI Generated Email
      </h2>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
        }}
      >
        {response}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() => {
            navigator.clipboard.writeText(response);
            alert("✅ Email copied successfully!");
          }}
          style={{
            padding: "10px 18px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📋 Copy
        </button>

        <button
          onClick={generateAI}
          style={{
            padding: "10px 18px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 Regenerate
        </button>

        <button
          onClick={() => {
            const blob = new Blob([response], {
              type: "text/plain",
            });

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "SalesPilot_Email.txt";
            a.click();

            URL.revokeObjectURL(url);
          }}
          style={{
            padding: "10px 18px",
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⬇ Download
        </button>

      </div>

    </div>
  );

}
