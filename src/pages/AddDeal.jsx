import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function AddDeal({ setPage }) {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  async function addDeal() {
    if (!client || !amount) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("deals")
      .insert([
        {
          client,
          amount,
          status,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Deal Added Successfully");
      setPage("deals");
    }
  }

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>💼 Add Deal</h1>

        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="search-input"
        />

        <br /><br />

        <input
          type="number"
          placeholder="Deal Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="search-input"
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="search-input"
        >
          <option value="Pending">Pending</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <br /><br />

        <button
          onClick={addDeal}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Deal
        </button>
      </div>
    </div>
  );
}

      
