import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";


export default function SalesForecast() {

  const [sales, setSales] = useState("");
  const [leads, setLeads] = useState("");
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
  loadForecast();
}, []);

async function loadForecast() {

  const { data: deals } = await supabase
    .from("deals")
    .select("*");

  const { data: leads } = await supabase
    .from("leads")
    .select("*");

  const wonDeals =
    deals?.filter((d) => d.status === "Won") || [];

  const revenue = wonDeals.reduce(
    (sum, deal) => sum + Number(deal.amount || 0),
    0
  );

  setSales(revenue);
  setLeads(leads?.length || 0);
}

  function generateForecast() {

    const totalSales = Number(sales);
    const totalLeads = Number(leads);

    if (!totalSales || !totalLeads) {
      alert("Please enter sales and leads.");
      return;
    }

    const growth = (totalSales * 1.15).toFixed(0);
    const conversion = ((totalSales / totalLeads) * 100).toFixed(1);

    setForecast({
      growth,
      conversion,
      recommendation:
        conversion > 30
          ? "Excellent sales performance. Increase marketing budget."
          : "Focus on lead nurturing and follow-up emails.",
    });

  }

  return (

    <div
      className="customers-page"
      style={{ marginTop: "80px" }}
    >

      <h1>📈 Sales Forecast AI</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "25px",
        }}
      >
        Predict next month's sales performance using AI.
      </p>

      <div
  className="customer-card"
  style={{ marginBottom: "25px" }}
>
  <h3>📊 Live Business Data</h3>

  <p><strong>Revenue:</strong> ₹{Number(sales).toLocaleString()}</p>

  <p><strong>Total Leads:</strong> {leads}</p>

  <p style={{ color: "#94a3b8" }}>
    Data is automatically loaded from your CRM.
  </p>
</div>
        
        
        

      <button onClick={generateForecast}>
        🚀 Generate Forecast
      </button>

            {forecast && (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <div className="customer-card">
            <h3>📈 Predicted Revenue</h3>
            <h1>₹{Number(forecast.growth).toLocaleString()}</h1>
          </div>

          <div className="customer-card">
            <h3>🎯 Conversion Rate</h3>
            <h1>{forecast.conversion}%</h1>
          </div>

          <div className="customer-card">
            <h3>🤖 AI Recommendation</h3>
            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
                color: "#e2e8f0",
              }}
            >
              {forecast.recommendation}
            </p>
          </div>

        </div>
      )}

    </div>

  );

}
