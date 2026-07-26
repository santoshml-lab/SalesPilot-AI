import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Deals({ setPage, setSelectedDeal }) {

  const [deals, setDeals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setDeals(data);
    }
  }

  async function deleteDeal(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deal?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Deal deleted successfully");
      fetchDeals();
    }
  }

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >

        <h1>💼 Deals</h1>

        <button
          onClick={() => setPage("addDeal")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          + Add Deal
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Search Client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="customers-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {deals
            .filter((deal) =>
              deal.client.toLowerCase().includes(search.toLowerCase())
            )
            .map((deal) => (

              <tr key={deal.id}>

                <td>{deal.client}</td>

                <td>
                  ₹{Number(deal.amount).toLocaleString("en-IN")}
                </td>

                <td>{deal.status}</td>

                <td>

                  <button
  onClick={() => {
    setSelectedDeal(deal);
    setPage("addDeal");
  }}
  style={{
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Edit
</button>
                    
                                      
                    

                  <button
                    onClick={() => deleteDeal(deal.id)}
                    style={{
                      marginLeft: "10px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}


