import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Reports() {

  const [loading, setLoading] = useState(false);

  async function exportTable(tableName) {

    setLoading(true);

    const { data, error } = await supabase
      .from(tableName)
      .select("*");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      alert("No data found");
      setLoading(false);
      return;
    }

    const headers = Object.keys(data[0]);

    const csv = [
      headers.join(","),
      ...data.map(row =>
        headers.map(h => `"${row[h] ?? ""}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${tableName}.csv`;
    link.click();

    URL.revokeObjectURL(url);

    setLoading(false);
  }

  return (

    <div
      className="customers-page"
      style={{
        marginTop: "90px",
        padding: "30px",
      }}
    >

      <h1>📄 Reports & Export Center</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div className="customer-card">
          <h2>👥 Customers</h2>

          <button onClick={() => exportTable("customers")}>
            Export CSV
          </button>
        </div>

        <div className="customer-card">
          <h2>📈 Leads</h2>

          <button onClick={() => exportTable("leads")}>
            Export CSV
          </button>
        </div>

        <div className="customer-card">
          <h2>💼 Deals</h2>

          <button onClick={() => exportTable("deals")}>
            Export CSV
          </button>
        </div>

      </div>

      {loading && (
        <p style={{ marginTop: "20px" }}>
          Exporting...
        </p>
      )}

    </div>

  );

}
