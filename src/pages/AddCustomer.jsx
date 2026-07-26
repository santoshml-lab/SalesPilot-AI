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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [customerType, setCustomerType] = useState("Regular");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name || "");
      setCompany(selectedCustomer.company || "");
      setEmail(selectedCustomer.email || "");
      setPhone(selectedCustomer.phone || "");
      setCity(selectedCustomer.city || "");
      setNotes(selectedCustomer.notes || "");
      setCustomerType(selectedCustomer.customer_type || "Regular");
      setStatus(selectedCustomer.status || "Active");
    }
  }, [selectedCustomer]);

  async function saveCustomer() {

    if (!name || !company || !email || !phone || !city) {
      alert("Please fill all required fields");
      return;
    }

    if (selectedCustomer) {

      const { error } = await supabase
        .from("customers")
        .update({
          name,
          company,
          email,
          phone,
          city,
          notes,
          customer_type: customerType,
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
            email,
            phone,
            city,
            notes,
            customer_type: customerType,
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
          maxWidth: "550px",
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-box-customer"
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="search-box-customer"
        />

        <br /><br />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-box-customer"
        />

        <br /><br />

        <select
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          className="search-box-customer"
        >
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="Premium">Premium</option>
        </select>

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="search-box-customer"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br /><br />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="search-box-customer"
          rows="4"
        />

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

    
