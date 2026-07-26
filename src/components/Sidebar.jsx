import "../styles/sidebar.css";

export default function Sidebar({ setPage }) {
  return (
    <aside className="sidebar">

      <h2>🚀 SalesPilot AI</h2>

      <ul>

        <li onClick={() => setPage("dashboard")}>
          🏠 Dashboard
        </li>

        <li onClick={() => setPage("customers")}>
          👥 Customers
        </li>

        <li onClick={() => setPage("deals")}>
          💼 Deals
        </li>

        <li onClick={() => setPage("leads")}>
          📈 Leads
        </li>

        <li onClick={() => setPage("ai")}>
          🤖 AI Assistant
        </li>

        <li onClick={() => setPage("analytics")}>
  📊 Analytics
</li>
        <li onClick={() => setPage("reminders")}>
  📅 Reminders
</li>
        <li onClick={() => setPage("notifications")}>
  🔔 Notifications
</li>
          
        

        <li onClick={() => setPage("settings")}>
          ⚙️ Settings
        </li>

      </ul>

    </aside>
  );
}
