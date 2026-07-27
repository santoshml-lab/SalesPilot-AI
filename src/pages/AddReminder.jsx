import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";


export default function AddReminder({ setPage }) {

  const [title, setTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [priority, setPriority] = useState("Medium");

    async function saveReminder() {

    if (!title || !reminderDate) {
      alert("Please fill all required fields");
      return;
    }

    const { error } = await supabase
      .from("reminders")
      .insert([
        {
          title,
          reminder_date: reminderDate,
          reminder_time: reminderTime,
          priority,
          status: "Pending",
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Reminder Added Successfully");
      setPage("calendar");
    }
  }

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <div
        style={{
          maxWidth: "550px",
          margin: "0 auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "15px",
        }}
      >

        <h1 style={{ marginBottom: "25px" }}>
          📅 Add Reminder
        </h1>

                <input
          className="search-input"
          placeholder="Reminder Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="date"
          className="search-input"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
        />

        <br /><br />

        <input
          type="time"
          className="search-input"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />

        <br /><br />

        <select
          className="search-input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <br /><br />

        <button
          onClick={saveReminder}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💾 Save Reminder
        </button>

      </div>

    </div>
  );
}
