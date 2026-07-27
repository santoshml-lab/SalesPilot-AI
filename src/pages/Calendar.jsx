import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Calendar({ setPage }) {

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  async function fetchReminders() {

    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .order("reminder_date", { ascending: true });

    if (!error) {
      setReminders(data);
    }

  }
  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >
      <h1>📅 Calendar & Follow-ups</h1>

      <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
        Manage meetings, reminders and follow-ups.
      </p>

      {/* Today's Schedule */}

      <div
        style={{
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
        }}
      >
        <h2>📅 Today's Schedule</h2>

        <div style={{ marginTop: "15px" }}>
          <p>📞 Call ABC Company — 10:00 AM</p>
          <p>🤝 Meeting with Rahul — 2:00 PM</p>
          <p>📧 Send Follow-up Email — 5:00 PM</p>
        </div>
      </div>

      {/* Upcoming */}

      <div
        style={{
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
        }}
      >
        <h2>🔔 Upcoming Follow-ups</h2>

        <div style={{ marginTop: "15px" }}>
          <p>Tomorrow — TechNova Pvt Ltd</p>
          <p>Friday — GreenSoft</p>
          <p>Next Monday — SkyTech</p>
        </div>
      </div>

      {/* Overdue */}

      <div
        style={{
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
        }}
      >
        <h2>❌ Overdue Tasks</h2>

        <div style={{ marginTop: "15px" }}>
          <p>Proposal pending for Apex Ltd.</p>
          <p>Call pending for GlobalTech.</p>
        </div>
      </div>

      {/* Live Reminders */}

<div
  style={{
    background: "#111827",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "25px",
  }}
>
  <h2>📋 Live Reminders</h2>

  {reminders.length === 0 ? (

    <p style={{ color: "#94a3b8", marginTop: "15px" }}>
      No reminders found.
    </p>

  ) : (

    reminders.map((item) => (

      <div
        key={item.id}
        style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div>

          <h3 style={{ margin: 0 }}>
            {item.title}
          </h3>

          <p style={{ margin: "6px 0", color: "#94a3b8" }}>
            📅 {item.reminder_date}
          </p>

          <p style={{ margin: 0 }}>
            ⏰ {item.reminder_time}
          </p>

          <p style={{ marginTop: "5px" }}>
            🔥 {item.priority}
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <button
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ✅ Complete
          </button>

          <button
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    ))

  )}

</div>

      {/* Quick Actions */}

      <div
        style={{
          background: "#111827",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h2>⚡ Quick Actions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
  className="search-input"
  onClick={() => setPage("addReminder")}
>
  ➕ Add Reminder
</button>
  


          <button className="search-input">📅 Schedule Meeting</button>

          <button className="search-input">📞 Schedule Call</button>
        </div>
      </div>
    </div>
  );
}
