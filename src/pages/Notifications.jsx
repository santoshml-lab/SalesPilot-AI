import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setNotifications(data || []);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <h3>No Notifications</h3>
      ) : (

        notifications.map((lead) => (

          <div
            key={lead.id}
            style={{
              background: "#111827",
              color: "white",
              padding: "18px",
              marginBottom: "15px",
              borderRadius: "12px",
              borderLeft: "5px solid #2563eb",
            }}
          >

            {lead.follow_up_date < today && (
              <p>🔴 <b>Overdue Follow-up</b> — {lead.name}</p>
            )}

            {lead.follow_up_date === today && (
              <p>🟡 <b>Today's Follow-up</b> — {lead.name}</p>
            )}

            {lead.status === "New" && (
              <p>🔵 <b>New Lead</b> — {lead.name}</p>
            )}

            {lead.status === "Won" && (
              <p>🟢 <b>Deal Won</b> — {lead.name}</p>
            )}

          </div>

        ))

      )}

    </div>
  );
}
