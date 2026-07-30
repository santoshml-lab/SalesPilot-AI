import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function AICustomerInsights() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    const { data } = await supabase
      .from("customers")
      .select("*");

    setCustomers(data || []);
  }

  function getCategory(customer) {

    const revenue = Number(customer.revenue || 0);

    if (revenue >= 100000)
      return {
        label: "⭐ VIP Customer",
        color: "#22c55e",
      };

    if (revenue >= 30000)
      return {
        label: "📈 Growing Customer",
        color: "#3b82f6",
      };

    return {
      label: "⚠️ Needs Attention",
      color: "#f59e0b",
    };
  }
    return (
    <div
      className="customers-page"
      style={{ marginTop: "80px", padding: "30px" }}
    >

      <h1>🤖 AI Customer Insights</h1>

      <div className="customer-card">

        <table className="customer-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Revenue</th>
              <th>AI Insight</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer) => {

              const insight = getCategory(customer);

              return (
                <tr key={customer.id}>

                  <td>{customer.name}</td>

                  <td>{customer.email}</td>

                  <td>
                    ₹{Number(customer.revenue || 0).toLocaleString()}
                  </td>

                  <td
                    style={{
                      color: insight.color,
                      fontWeight: "bold",
                    }}
                  >
                    {insight.label}
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );

}
