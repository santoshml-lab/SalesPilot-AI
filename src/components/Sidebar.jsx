import "../styles/sidebar.css";

export default function Sidebar({ setPage }) {
  return (
    <aside className="sidebar">

      <h2>🚀 SalesPilot AI</h2>

      <ul>
        <li onClick={() => setPage("dashboard")}>🏠 Dashboard</li>

        <li onClick={() => setPage("deals")}>💼 Deals</li>

        <li>👥 Customers</li>

        <li>📈 Leads</li>

        <li onClick={() => setPage("ai")}>
      🤖 AI Assistant
       </li>

        <li>📊 Analytics</li>

        <li>⚙️ Settings</li>

      </ul>

    </aside>
  );
}
