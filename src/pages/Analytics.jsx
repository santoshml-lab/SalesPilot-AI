import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Analytics() {

  const [customers, setCustomers] = useState(0);
  const [leads, setLeads] = useState(0);
  const [deals, setDeals] = useState(0);
  const [wonDeals, setWonDeals] = useState(0);
  const [lostDeals, setLostDeals] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {

    const { count: customerCount } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    const { data: leadData } = await supabase
      .from("leads")
      .select("*");

    const { data: dealData } = await supabase
      .from("deals")
      .select("*");

    setCustomers(customerCount || 0);
    setLeads(leadData?.length || 0);
    setDeals(dealData?.length || 0);

    const won = dealData?.filter(d => d.status === "Won") || [];
    const lost = dealData?.filter(d => d.status === "Lost") || [];

    setWonDeals(won.length);
    setLostDeals(lost.length);

    const totalRevenue = won.reduce(
      (sum, deal) => sum + Number(deal.amount || 0),
      0
    );

    setRevenue(totalRevenue);
  }

  const conversion =
    leads > 0
      ? ((wonDeals / leads) * 100).toFixed(1)
      : 0;

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <h1>📊 Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div className="customer-card">
          <h3>👥 Customers</h3>
          <h1>{customers}</h1>
        </div>

        <div className="customer-card">
          <h3>📈 Leads</h3>
          <h1>{leads}</h1>
        </div>

        <div className="customer-card">
          <h3>💼 Deals</h3>
          <h1>{deals}</h1>
        </div>

        <div className="customer-card">
          <h3>✅ Won Deals</h3>
          <h1>{wonDeals}</h1>
        </div>

        <div className="customer-card">
          <h3>❌ Lost Deals</h3>
          <h1>{lostDeals}</h1>
        </div>

        <div className="customer-card">
          <h3>💰 Revenue</h3>
          <h1>₹{revenue.toLocaleString()}</h1>
        </div>

        <div className="customer-card">
          <h3>🎯 Conversion</h3>
          <h1>{conversion}%</h1>
        </div>

      </div>

    </div>
  );
}
