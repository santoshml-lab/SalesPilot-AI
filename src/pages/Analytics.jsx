import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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
  const pieData = [
  { name: "Won", value: wonDeals },
  { name: "Lost", value: lostDeals },
  { name: "Pending", value: deals - wonDeals - lostDeals },
];

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

const barData = [
  { name: "Customers", value: customers },
  { name: "Leads", value: leads },
  { name: "Deals", value: deals },
];

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
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    marginTop: "40px",
  }}
>

  <div className="customer-card">
    <h2>📊 Business Overview</h2>

    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>

  </div>

  <div className="customer-card">
    <h2>🥧 Deal Status</h2>

    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={110}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

  </div>

</div>0

      </div>

    </div>
  );
}
