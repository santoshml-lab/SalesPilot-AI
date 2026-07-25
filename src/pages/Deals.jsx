import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Deals() {

  const [deals, setDeals] = useState([]);

  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    const { data, error } = await supabase
      .from("deals")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setDeals(data);
    }
  }

  async function addDeal() {

    if (!client || !amount || !status) {
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
      console.error(error);
    } else {
      setClient("");
      setAmount("");
      setStatus("");
      fetchDeals();
    }
  }

  return (
    <div className="customers-page">

      <div className="customers-header">
        <h1>Deals</h1>
      </div>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button onClick={addDeal}>
          Add Deal
        </button>

      </div>

      <table className="customers-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {deals.map((deal) => (

            <tr key={deal.id}>
              <td>{deal.client}</td>
              <td>₹{Number(deal.amount).toLocaleString("en-IN")}</td>
              <td>{deal.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
