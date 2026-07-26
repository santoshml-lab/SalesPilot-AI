import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customer.css";

export default function AddCustomer({
  setPage,
  selectedCustomer,
  setSelectedCustomer,
}) {

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setCompany(selectedCustomer.company);
      setStatus(selectedCustomer.status);
    }
  }, [selectedCustomer]);

  async function saveCustomer() {

    if (!name || !company) {
      alert("Please fill all fields");
      return;
    }

    if (selectedCustomer) {

      const { error } = await supabase
        .from("customers")
        .update({
          name,
          company,
          status,
        })
        .eq("id", selectedCustomer.id);

      if (error) {
        alert(error.message);
      } else {
        alert("Customer Updated Successfully");
        setSelectedCustomer(null);
        setPage("customers");
      }

    } else {

      const { error } = await supabase
        .from("customers")
        .insert([
          {
            name,
            company,
            status,
          },
        ]);

      if (error) {
        alert(error.message);
      } else {
        alert("Customer Added Successfully");
        setPage("customers");
      }
    }
  }

  return (
    <div
      className="customer-card"
      style={{
        marginTop: "90px",
        padding: "30px",
      }}
    >

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "15px",
        }}
      >

        <h1 style={{ marginBottom: "25px" }}>
          {selectedCustomer ? "✏️ Edit Customer" : "👥 Add Customer"}
        </h1>

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-box-customer"
        />

        <br /><br />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="search-box-customer"
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="search-box-customer"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>VIP</option>
        </select>

        <br /><br />

        <button
          onClick={saveCustomer}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {selectedCustomer ? "Update Customer" : "Save Customer"}
        </button>

            </div>

    </div>
  );
}

    
