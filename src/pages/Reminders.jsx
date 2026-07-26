import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Reminders() {

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  async function loadReminders() {

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("follow_up_date", { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setReminders(data || []);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <h1>📅 Follow-up Reminders</h1>

      <table className="customers-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Follow Up</th>
            <th>Assigned To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {reminders.map((lead) => (

            <tr
              key={lead.id}
              style={{
                background:
                  lead.follow_up_date < today
                    ? "#3b0a0a"
                    : "transparent",
              }}
            >

              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.phone}</td>
              <td>{lead.follow_up_date}</td>
              <td>{lead.assigned_to}</td>
              <td>{lead.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
