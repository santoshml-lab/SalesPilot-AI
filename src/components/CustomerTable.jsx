import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customer.css";

export default function CustomerTable() {

  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const { data, error } = await supabase
      .from("customers")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setCustomers(data);
    }
  }

  async function addCustomer() {

    if (!name || !company || !status) {
      alert("Please fill all fields");
      return;
    }

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
      console.error(error);
    } else {
      setName("");
      setCompany("");
      setStatus("");

      fetchCustomers();
    }
  }

  return (

    <div className="customer-card">

      <h2>
        Recent Customers
      </h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginRight: "10px", padding: "10px" }}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "10px", padding: "10px" }}
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>

      </div>

      <table className="customer-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.name}</td>

              <td>{customer.company}</td>

              <td>{customer.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
