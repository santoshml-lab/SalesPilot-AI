import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="search-box">
        🔍 Search...
      </div>

      <div className="nav-right">

        <span>
          🔔
        </span>

        <span>
          👤 Admin
        </span>

      </div>

    </nav>
  );
}
