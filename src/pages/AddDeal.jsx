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
    <div className="customers-page">

      <h1>Add Deal</h1>

      <div style={{ marginTop: "30px" }}>

        <input
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <br /><br />

        <button onClick={addDeal}>
          Save Deal
        </button>

      </div>

    </div>
  );
}
