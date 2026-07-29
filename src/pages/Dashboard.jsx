import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "../styles/dashboard.css";
import StatCard from "../components/StatCard";


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
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  
  

  useEffect(() => {
    loadCustomerCount();
    loadLeadCount();
    loadDeals();
    loadConversion();

    loadPendingReminders();
    loadCompletedReminders();
    loadTodayReminders();

    loadTopLeads();
    loadNotifications();
    loadActivities();
    
    
  }, []);

  async function loadCustomerCount() {
  const { count } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  setCustomerCount(count || 0);
}

async function loadLeadCount() {
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  setLeadCount(count || 0);
}

async function loadDeals() {
  const { data } = await supabase
    .from("deals")
    .select("*");

  if (!data) return;

  setDealCount(data.length);

  const total = data.reduce((sum, deal) => {
    return deal.status === "Won"
      ? sum + Number(deal.amount)
      : sum;
  }, 0);

  setRevenue(total);
  
}

async function loadConversion() {
  const { count: leadTotal } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  const { count: wonDeals } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("status", "Won");

  if (leadTotal > 0) {
    setConversion(`${((wonDeals / leadTotal) * 100).toFixed(1)}%`);
  } else {
    setConversion("0%");
  }
}

async function loadPendingReminders() {
  const { count } = await supabase
    .from("reminders")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");

  setPendingReminders(count || 0);
}

async function loadCompletedReminders() {
  const { count } = await supabase
    .from("reminders")
    .select("*", { count: "exact", head: true })
    .eq("status", "Completed");

  setCompletedReminders(count || 0);
}

async function loadTodayReminders() {
  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("reminders")
    .select("*")
    .eq("reminder_date", today)
    .order("reminder_time");

  setTodayReminders(data || []);
}

  async function loadTopLeads() {
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("score", { ascending: false })
    .limit(5);

  setTopLeads(data || []);
}

async function loadNotifications() {
  const { data } = await supabase
    .from("reminders")
    .select("*")
    .eq("status", "Pending")
    .order("reminder_date", { ascending: true })
    .limit(5);

  setNotifications(data || []);
}

async function loadActivities() {
  const activityList = [];

  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: false })
    .limit(2);

  customers?.forEach((item) => {
    activityList.push({
      text: `👤 New customer added: ${item.name}`,
    });
  });
    

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("id", { ascending: false })
    .limit(2);

  leads?.forEach((item) => {
    activityList.push({
      text: `📈 New lead created: ${item.name}`,
    });
  });

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("id", { ascending: false })
    .limit(2);

  deals?.forEach((item) => {
    activityList.push({
      text: `💼 Deal updated: ${item.title}`,
    });
  });

  setActivities(activityList);
      }

  return (
  <div className="dashboard">

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        fontSize: "34px",
        fontWeight: "700",
      }}
    >
      📊 Sales Dashboard
    </h1>

    <p
      style={{
        color: "#94a3b8",
        marginTop: "8px",
      }}
    >
      Welcome back! Here's today's business overview.
    </p>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "12px 20px",
      borderRadius: "12px",
      color: "#22c55e",
      fontWeight: "bold",
    }}
  >
    🟢 CRM Online
  </div>
</div>
    

    <div
  className="stats-container"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  }}
>

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
        icon="📊"
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
    <h2
  style={{
    marginTop: "30px",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
  }}
>
  ⚡ Quick Actions
</h2>
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "18px",
    marginBottom: "35px",
  }}
>

  <button className="quick-btn" onClick={() => setPage("addCustomer")}>
    👤<br />
    Add Customer
  </button>

  <button className="quick-btn" onClick={() => setPage("addLead")}>
    📈<br />
    Add Lead
  </button>

  <button className="quick-btn" onClick={() => setPage("addDeal")}>
    💼<br />
    Add Deal
  </button>

  <button className="quick-btn" onClick={() => setPage("ai")}>
    🤖<br />
    AI Assistant
  </button>

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
    🤖 AI Business Insights
  </h2>

  <div className="ai-grid">
    
      
      
      

    <div className="ai-card">
  <h3>📈 Sales Growth</h3>
  <p>Your sales pipeline is growing steadily.</p>
</div>
      
        
        
        
        
      <p>Your sales pipeline is growing steadily.</p>
    </div>

    <div className="ai-card">
      
        
        
        
      
    
      <h3>🔥 High Priority</h3>
      <p>Follow up with high-score leads first.</p>
    </div>

    <div className="ai-card">
      
        
        
        
      
    
      <h3>💰 Revenue</h3>
      <p>Won deals contribute the highest revenue.</p>
    </div>

    <div className="ai-card">
      
        
        
        
    
      <h3>⭐ AI Suggestion</h3>
      <p>Contact new leads within 24 hours for maximum conversion.</p>
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
    📋 Recent Activity Timeline
  </h2>

  {activities.length === 0 ? (

    <p style={{ color: "#94a3b8" }}>
      No recent activity.
    </p>

  ) : (

    activities.map((activity, index) => (

      <div
        key={index}
        style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "12px",
          borderLeft: "4px solid #2563eb"
        }}
      >

        <div
          style={{
            fontWeight: "bold",
            color: "white"
          }}
        >
          {activity.text}
        </div>

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
    border: "1px solid rgba(255,255,255,.08)"
  }}
>

  <h2 style={{ marginBottom: "20px" }}>
    📅 Today's Reminders
  </h2>

  {todayReminders.length === 0 ? (

    <p style={{ color: "#94a3b8" }}>
      No reminders for today.
    </p>

  ) : (

    todayReminders.map((item) => (

      <div
        key={item.id}
        style={{
          background: "#1e293b",
          padding: "18px",
          borderRadius: "10px",
          marginBottom: "15px"
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

    <p style={{ color: "#94a3b8" }}>
      No leads available.
    </p>

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

          {lead.score >= 80 ? (
            <span
              style={{
                background: "#16a34a",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              🔥 High Priority
            </span>
          ) : lead.score >= 50 ? (
            <span
              style={{
                background: "#f59e0b",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              ⚡ Medium Priority
            </span>
          ) : (
            <span
              style={{
                background: "#ef4444",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              ❄️ Low Priority
            </span>
          )}

          <div
            style={{
              marginTop: "8px",
              fontWeight: "bold",
            }}
          >
            {lead.score}%
          </div>

          <br />

          <small>
            {lead.score >= 80
              ? "📞 Call Immediately"
              : lead.score >= 50
              ? "📧 Send Follow-up"
              : "⏳ Nurture Lead"}
          </small>

        </div>

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
  }}
>

  <h2>🔔 Smart Notifications</h2>

  {notifications.length === 0 ? (

    <p style={{ color: "#94a3b8" }}>
      No pending reminders 🎉
    </p>

  ) : (

    notifications.map((item) => (

      <div
        key={item.id}
        style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
        }}
      >

        <strong>{item.title}</strong>

        <br />

        <small>
          📅 {item.reminder_date}
        </small>

      </div>

    ))

  )}

</div>

</div>

);

}
      

  


  
