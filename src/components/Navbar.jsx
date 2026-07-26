import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/navbar.css";

export default function Navbar({ setPage }) {

  const [count, setCount] = useState(0);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  async function loadNotificationCount() {

    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("leads")
      .select("id, follow_up_date");

    if (!data) return;

    const total = data.filter(
      (lead) => lead.follow_up_date <= today
    ).length;

    setCount(total);
  }

  return (
    <nav className="navbar">

      <div className="search-box">
        🔍 Search...
      </div>

      <div className="nav-right">

        <div
  onClick={() => setPage("notifications")}
  style={{
    position: "relative",
    marginRight: "25px",
    cursor: "pointer",
    fontSize: "24px",
  }}
>
  🔔

  {count > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-10px",
        background: "#ef4444",
        color: "white",
        borderRadius: "50%",
        width: "22px",
        height: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {count}
    </span>
  )}
</div>
          
            
            
            
                
                

        <span
  onClick={() => setPage("profile")}
  style={{ cursor: "pointer", fontWeight: "bold" }}
>
  👤 Admin
</span>
          
            
            
          
        
        
        

      </div>

    </nav>
  );
}
