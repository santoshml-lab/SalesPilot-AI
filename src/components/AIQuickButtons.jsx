export default function AIQuickButtons({
  setPrompt,
  setEmailType,
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <button
          className="search-input"
          onClick={() =>
            setPrompt(
              "Write a professional follow-up email for a customer after a product demo."
            )
          }
        >
          ✉️ Follow-up
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt(
              "Generate a cold outreach email introducing SalesPilot AI CRM."
            )
          }
        >
          📩 Cold Email
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt(
              "Write a business proposal email for CRM software."
            )
          }
        >
          📄 Proposal
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt(
              "Generate a meeting request email for a sales discussion."
            )
          }
        >
          🤝 Meeting
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <button
          className="search-input"
          onClick={() => {
            setEmailType("Follow-up Email");
            setPrompt("Write a professional follow-up email.");
          }}
        >
          ✉️ Email
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt("Generate a professional sales call script.")
          }
        >
          📞 Call Script
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt("Generate a business proposal for CRM software.")
          }
        >
          📄 Proposal
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt("Generate a meeting summary.")
          }
        >
          📅 Meeting Summary
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt("Write a WhatsApp follow-up message.")
          }
        >
          💬 WhatsApp
        </button>

        <button
          className="search-input"
          onClick={() =>
            setPrompt(
              "Analyze sales performance and suggest improvements."
            )
          }
        >
          📊 Sales Analysis
        </button>
      </div>
    </>
  );
}
