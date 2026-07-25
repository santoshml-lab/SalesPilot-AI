import { useState } from "react";
import "../styles/customers.css";

export default function AIAssistant() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  function generateAI() {

    if (!prompt) {
      alert("Please enter a prompt");
      return;
    }

    if (prompt.toLowerCase().includes("email")) {
      setResponse(
`Subject: Follow-up Regarding Our Discussion

Hi,

Thank you for your time. I wanted to follow up regarding our previous discussion. I believe our solution can help improve your business results.

Please let me know a convenient time to continue our conversation.

Best Regards`
      );
    }

    else if (prompt.toLowerCase().includes("pitch")) {
      setResponse(
"Our AI-powered CRM helps businesses manage customers, automate follow-ups, and increase sales efficiently."
      );
    }

    else if (prompt.toLowerCase().includes("follow")) {
      setResponse(
"Hello! Just checking in to see if you've had a chance to review our proposal. Looking forward to hearing your thoughts."
      );
    }

    else {
      setResponse(
"AI Response: Thank you for your question. Connect an AI API (OpenAI/Groq) to generate intelligent responses."
      );
    }
  }

  return (

    <div
  className="customers-page"
  style={{ marginTop: "80px" }}
>

      <h1>🤖 AI Sales Assistant</h1>

      <p style={{ color:"#94a3b8", marginBottom:"20px" }}>
        Ask AI to generate emails, sales pitches and follow-ups.
      </p>

      <textarea
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Ask AI anything..."
        style={{
          width:"100%",
          height:"180px",
          padding:"15px",
          borderRadius:"12px",
          background:"#1e293b",
          color:"white",
          border:"1px solid rgba(255,255,255,.1)"
        }}
      />

      <button
        onClick={generateAI}
        style={{
          marginTop:"20px",
          padding:"12px 25px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"10px",
          cursor:"pointer"
        }}
      >
        Generate
      </button>

      {response && (
        <div
          style={{
            marginTop:"25px",
            padding:"20px",
            background:"#1e293b",
            borderRadius:"12px",
            whiteSpace:"pre-wrap"
          }}
        >
          {response}
        </div>
      )}

    </div>
  );
}
