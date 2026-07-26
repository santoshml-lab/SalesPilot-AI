import { useState, useEffect } from "react";
import "../styles/customers.css";

async function generateAI(customPrompt = null) {

  const finalPrompt = customPrompt || prompt;

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

<p style={{ color:"#94a3b8", marginBottom:"20px", fontSize:"16px" }}>
  Your intelligent AI assistant for sales, customer engagement, lead management, deal insights, email writing, follow-ups, and business growth.
</p>     
          

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
        onClick={generateAI}
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
            padding: "20px",
            background: "#1e293b",
            borderRadius: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </div>
      )}

    </div>
  );
}
