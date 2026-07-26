import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/notifications.css";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("follow_up_date", { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setNotifications(data || []);
    }

  }

  const today = new Date().toISOString().split("T")[0];

  return (

    <div
      style={{
        marginTop: "90px",
        padding: "30px",
      }}
    >

      <h1 style={{ color: "white", marginBottom: "25px" }}>
        🔔 Notifications Center
      </h1>

      {notifications.length === 0 ? (

        <div className="notification-card">
          <h3>No Notifications 🎉</h3>
        </div>

      ) : (

        notifications.map((lead) => (

          <div
            key={lead.id}
            className="notification-card"
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

              <h3 className="notification-title">

                {lead.follow_up_date < today
                  ? "🔴 Overdue Follow-up"
                  : lead.follow_up_date === today
                  ? "🟡 Today's Follow-up"
                  : "🟢 Upcoming Follow-up"}

              </h3>

              <span className="notification-badge">
                {lead.status}
              </span>

            </div>

            <p><b>👤 Lead:</b> {lead.name}</p>

            <p><b>🏢 Company:</b> {lead.company}</p>

            <p><b>📞 Phone:</b> {lead.phone}</p>

            <p><b>📅 Follow-up:</b> {lead.follow_up_date}</p>

            <p><b>👨‍💼 Assigned To:</b> {lead.assigned_to}</p>

            <p><b>📝 Notes:</b> {lead.notes}</p>

            <p className="notification-time">
              🕒 Auto Generated Notification
            </p>

          </div>

        ))

      )}

    </div>

  );

}
