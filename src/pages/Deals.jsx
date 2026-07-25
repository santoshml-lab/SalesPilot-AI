import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Deals() {

  const [deals, setDeals] = useState([]);

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

  return (

    <div className="customers-page">

      <div className="customers-header">

        <h1>Deals</h1>

        <button>Add Deal</button>

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

              <td>
                ₹{Number(deal.amount).toLocaleString("en-IN")}
              </td>

              <td>{deal.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}


