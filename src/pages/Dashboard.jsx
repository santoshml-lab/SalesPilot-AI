import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard({ setPage }) {

  const [customerCount, setCustomerCount] = useState(0);
  const [dealCount, setDealCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [conversion, setConversion] = useState("0%");
  const [leadCount, setLeadCount] = useState(0);
  const [pendingReminders, setPendingReminders] = useState(0);
  const [completedReminders, setCompletedReminders] = useState(0);
  const [todayReminders, setTodayReminders] = useState([]);
  const [topLeads, setTopLeads] = useState([]);

  useEffect(() => {
    loadCustomerCount();
    loadLeadCount();
    loadDeals();
    loadConversion();
    loadPendingReminders();
    loadCompletedReminders();
    loadTodayReminders();
    loadTopLeads();
  }, []);
  

  async function loadCustomerCount() {
    const { count, error } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    if (!error) {
      setCustomerCount(count);
    }
  }
  async function loadLeadCount() {
  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  if (!error) {
    setLeadCount(count);
  }
  }

  async function loadDeals() {
    const { data, error } = await supabase
      .from("deals")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setDealCount(data.length);

    const totalRevenue = data.reduce((sum, deal) => {
      return deal.status === "Won"
        ? sum + Number(deal.amount)
        : sum;
    }, 0);

    setRevenue(totalRevenue);
  }

  async function loadConversion() {
    const { count: leadCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    const { count: wonDeals } = await supabase
      .from("deals")
      .select("*", { count: "exact", head: true })
      .eq("status", "Won");

    if (leadCount > 0) {
      const percent = ((wonDeals / leadCount) * 100).toFixed(1);
      setConversion(`${percent}%`);
    } else {
      setConversion("0%");
    }
  }
  async function loadTopLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("score", { ascending: false })
    .limit(5);

  if (!error) {
    setTopLeads(data);
  }
  }

  async function loadPendingReminders() {
  const { count, error } = await supabase
    .from("reminders")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");

  if (!error) {
    setPendingReminders(count);
  }
}

async function loadCompletedReminders() {
  const { count, error } = await supabase
    .from("reminders")
    .select("*", { count: "exact", head: true })
    .eq("status", "Completed");

  if (!error) {
    setCompletedReminders(count);
  }
}

  async function loadTodayReminders() {

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("reminder_date", today)
    .order("reminder_time", { ascending: true });

  if (!error) {
    setTodayReminders(data);
  }

  }

  return (
    <div className="dashboard">

      <h1>Sales Dashboard</h1>

      <p>Welcome to SalesPilot AI CRM</p>

      <div className="stats-container">

        <StatCard
          title="Revenue"
          value={`₹${revenue.toLocaleString("en-IN")}`}
          icon="💰"
        />

        <StatCard
          title="Customers"
          value={customerCount}
          icon="👥"
        />
        <StatCard
         title="Leads"
          value={leadCount}
          icon="📈"
         />

        <StatCard
          title="Deals"
          value={dealCount}
          icon="💼"
        />

        <StatCard
          title="Conversion"
          value={conversion}
          icon="📈"
        />
        <StatCard
  title="Pending"
  value={pendingReminders}
  icon="⏰"
/>

<StatCard
  title="Completed"
  value={completedReminders}
  icon="✅"
/>

      </div>

      <SalesChart />
      <div
  style={{
    marginTop: "30px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>

  <h2 style={{ marginBottom: "20px" }}>
    🤖 AI Business Insights
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px"
    }}
  >

    <div style={{background:"#1e293b",padding:"20px",borderRadius:"12px"}}>
      📈
      <h3>Sales Growth</h3>
      <p>Your leads are increasing steadily.</p>
    </div>

    <div style={{background:"#1e293b",padding:"20px",borderRadius:"12px"}}>
      🔥
      <h3>High Priority</h3>
      <p>Follow up with pending high-value deals.</p>
    </div>

    <div style={{background:"#1e293b",padding:"20px",borderRadius:"12px"}}>
      💰
      <h3>Revenue</h3>
      <p>Won deals contribute the highest revenue.</p>
    </div>

    <div style={{background:"#1e293b",padding:"20px",borderRadius:"12px"}}>
      ⭐
      <h3>AI Suggestion</h3>
      <p>Contact today's new leads within 24 hours.</p>
    </div>

  </div>

</div>
 <div
  style={{
    marginTop: "30px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>

  <h2 style={{ marginBottom: "20px" }}>
    📋 Recent Activity
  </h2>

  <div style={{ display: "grid", gap: "15px" }}>

    <div style={{
      background:"#1e293b",
      padding:"15px",
      borderRadius:"10px"
    }}>
      👤 New customer added successfully.
    </div>

    <div style={{
      background:"#1e293b",
      padding:"15px",
      borderRadius:"10px"
    }}>
      📈 New lead created.
    </div>

    <div style={{
      background:"#1e293b",
      padding:"15px",
      borderRadius:"10px"
    }}>
      💼 Deal updated.
    </div>

    <div style={{
      background:"#1e293b",
      padding:"15px",
      borderRadius:"10px"
    }}>
      🤖 AI Assistant generated sales insights.
    </div>

  </div>

</div>    
      
<div
  style={{
    marginTop: "30px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <div
  style={{
    marginTop: "30px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>

  <h2 style={{ marginBottom: "20px" }}>
    📅 Today's Reminders
  </h2>

  {todayReminders.length === 0 ? (

  <p>No reminders for today.</p>

) : (

  todayReminders.map((item) => (

    <div
      key={item.id}
      style={{
        background:"#1e293b",
        padding:"18px",
        borderRadius:"10px",
        marginBottom:"15px"
      }}
    >
      <h3>{item.title}</h3>

      <p>⏰ {item.reminder_time}</p>

      <p>🔥 {item.priority}</p>

      <p>📌 {item.status}</p>

    </div>

  ))

)}
    
      
      
    
    

</div>

  <div
  style={{
    marginTop: "30px",
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    🏆 Top AI Leads
  </h2>

  {topLeads.length === 0 ? (
    <p style={{ color: "#94a3b8" }}>No leads available.</p>
  ) : (
    topLeads.map((lead) => (
      <div
        key={lead.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "12px",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{lead.name}</h3>
          <p style={{ margin: "5px 0", color: "#94a3b8" }}>
            {lead.company}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <strong style={{ color: "#22c55e" }}>
            {lead.score}%
          </strong>
          <br />
          <small>{lead.status}</small>
        </div>
      </div>
    ))
  )}
</div>

  <h2 style={{ marginBottom: "20px" }}>
    ⚡ Quick Actions
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
      gap: "15px"
    }}
  >

    <button
      onClick={() => setPage("addCustomer")}
      style={{
        padding:"16px",
        background:"#2563eb",
        color:"white",
        border:"none",
        borderRadius:"12px",
        cursor:"pointer",
        fontWeight:"bold"
      }}
    >
      ➕ Add Customer
    </button>

    <button
      onClick={() => setPage("addLead")}
      style={{
        padding:"16px",
        background:"#10b981",
        color:"white",
        border:"none",
        borderRadius:"12px",
        cursor:"pointer",
        fontWeight:"bold"
      }}
    >
      📈 Add Lead
    </button>

    <button
      onClick={() => setPage("addDeal")}
      style={{
        padding:"16px",
        background:"#f59e0b",
        color:"white",
        border:"none",
        borderRadius:"12px",
        cursor:"pointer",
        fontWeight:"bold"
      }}
    >
      💼 Add Deal
    </button>

    <button 
      onClick={() => setPage("ai")}
      style={{
        padding:"16px",
        background:"#7c3aed",
        color:"white",
        border:"none",
        borderRadius:"12px",
        cursor:"pointer",
        fontWeight:"bold"
      }}
    >
      🤖 Open AI
    </button>

  </div>

</div>
    </div>
  );
}
