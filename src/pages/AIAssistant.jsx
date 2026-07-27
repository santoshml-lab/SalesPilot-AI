import { useState, useEffect } from "react";
import "../styles/customers.css";

export default function AIAssistant() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailType, setEmailType] = useState("Follow-up Email");

  useEffect(() => {

    const savedPrompt = localStorage.getItem("aiPrompt");

    if (savedPrompt) {
      setPrompt(savedPrompt);
      localStorage.removeItem("aiPrompt");

      setTimeout(() => {
        generateAI(savedPrompt);
      }, 300);
    }

  }, []);

  async function generateAI(customPrompt = null) {

    const finalPrompt = `
You are a professional Sales CRM AI.

Generate a ${emailType}.

User Request:
${customPrompt || prompt}

Requirements:
- Professional tone
- Clear subject line
- Proper greeting
- Well-structured email
- Strong closing
- Keep it concise and business-friendly.
`;










    if (!finalPrompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    try {

      setLoading(true);
      setResponse("");

      const res = await fetch(
        "https://salespilot-l1d3.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: finalPrompt,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(data.detail || "Something went wrong.");
      }

    } catch (error) {
      console.error(error);
      setResponse("Unable to connect to AI server.");
    } finally {
      setLoading(false);
    }

  }

  return (

        <div
      className="customers-page"
      style={{ marginTop: "80px" }}
    >

      <h1>🤖 SalesPilot AI Assistant</h1>
       <div style={{ marginBottom: "20px" }}>

  <label style={{ color: "white", fontWeight: "bold" }}>
    Email Type
  </label>

  <select
    className="search-input"
    value={emailType}
    onChange={(e) => setEmailType(e.target.value)}
  >
    <option>Follow-up Email</option>
    <option>Cold Outreach</option>
    <option>Proposal Email</option>
    <option>Meeting Request</option>
    <option>Thank You Email</option>
  </select>

</div>   

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        Your intelligent AI assistant for sales, customer engagement,
        lead management, deal insights, email writing,
        follow-ups, and business growth.
      </p>
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
      setPrompt("Write a professional follow-up email for a customer after a product demo.")
    }
  >
    ✉️ Follow-up
  </button>

  <button
    className="search-input"
    onClick={() =>
      setPrompt("Generate a cold outreach email introducing SalesPilot AI CRM.")
    }
  >
    📩 Cold Email
  </button>

  <button
    className="search-input"
    onClick={() =>
      setPrompt("Write a business proposal email for CRM software.")
    }
  >
    📄 Proposal
  </button>

  <button
    className="search-input"
    onClick={() =>
      setPrompt("Generate a meeting request email for a sales discussion.")
    }
  >
    🤝 Meeting
  </button>

</div>    

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask about sales, customers, emails, follow-ups, lead scoring, deals, business strategy..."
        style={{
          width: "100%",
          height: "180px",
          padding: "15px",
          borderRadius: "12px",
          background: "#1e293b",
          color: "white",
          border: "1px solid rgba(255,255,255,.1)",
        }}
      />

      <button
        onClick={() => generateAI()}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Generate AI Response"}
      </button>

      {response && (
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

  </div>
)}
        
          
            
            
            
          

          {response && (
  <button
    onClick={() => {
      navigator.clipboard.writeText(response);
      alert("✅ Email copied successfully!");
    }}
    style={{
      marginTop: "15px",
      marginRight: "10px",
      padding: "10px 18px",
      background: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    📋 Copy Email
  </button>
)}
          {response && (
  <button
    onClick={() => {
      const blob = new Blob([response], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "SalesPilot_Email.txt";
      a.click();

      URL.revokeObjectURL(url);
    }}
    style={{
      marginTop: "15px",
      padding: "10px 18px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ⬇ Download Email
  </button>
)}

              </div>
  );

}
