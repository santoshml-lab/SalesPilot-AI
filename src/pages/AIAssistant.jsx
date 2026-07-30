import { useState, useEffect } from "react";
import "../styles/customers.css";
import AIEmailType from "../components/AIEmailType";
import AIQuickButtons from "../components/AIQuickButtons";
import AIResponseCard from "../components/AIResponseCard";
export default function AIAssistant() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailType, setEmailType] = useState("Follow-up Email");
  const [history, setHistory] = useState([]);

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

    if (!prompt.trim() && !customPrompt) {
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

        setHistory((prev) => [
          {
            prompt: customPrompt || prompt,
            response: data.response,
            time: new Date().toLocaleString(),
          },
          ...prev,
        ]);

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

    <AIEmailType
  emailType={emailType}
  setEmailType={setEmailType}
/>
             

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

    <AIQuickButtons
  setPrompt={setPrompt}
  setEmailType={setEmailType}
/>
        

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
    <AIResponseCard
  response={response}
  generateAI={generateAI}
/>
    
    

    
      
      
        
          
            
            
            
          

          
  
