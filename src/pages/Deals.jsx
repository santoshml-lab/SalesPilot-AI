import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Deals() {

  const [deals, setDeals] = useState([]);
  const [search, setSearch] = useState("");

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

  async function deleteDeal(id) {

    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      fetchDeals();
    }

  }

  return (

    <div className="customers-page">

      <div className="customers-header">

        <h1>Deals</h1>

        <button>Add Deal</button>

      </div>

      <input
        className="search-box-customer"
        type="text"
        placeholder="🔍 Search Client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
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

                  <button>
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteDeal(deal.id)}
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


