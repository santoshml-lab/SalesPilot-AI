import { useState } from "react";
import "../styles/customers.css";

export default function Profile() {

  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@salespilot.ai");
  const [company, setCompany] = useState("SalesPilot AI");
  const [phone, setPhone] = useState("+91 9876543210");

  function saveProfile() {
    alert("✅ Profile Updated Successfully");
  }

  return (
    <div
      className="customers-page"
      style={{
        marginTop: "90px",
        padding: "30px",
      }}
    >

      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "#111827",
          padding: "35px",
          borderRadius: "16px",
          color: "white",
        }}
      >

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "45px",
              margin: "0 auto 20px",
            }}
          >
            👤
          </div>

          <h1>My Profile</h1>
        </div>

        <br />

        <input
          className="search-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <button
          onClick={saveProfile}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>

      </div>

    </div>
  );
}
