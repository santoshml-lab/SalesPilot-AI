import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customer.css";

export default function CustomerTable() {

  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

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

  async function deleteCustomer(id) {

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      fetchCustomers();
    }
  }

  return (

    <div className="customer-card">

      <h2>Recent Customers</h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button onClick={addCustomer}>
          Add Customer
        </button>

      </div>

      <input
  type="text"
  placeholder="🔍 Search by Name or Company..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    pointerEvents: "auto",
    position: "relative",
    zIndex: 9999
  }}
/>
                 
      

      <table className="customer-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {customers
            .filter((customer) =>
              customer.name.toLowerCase().includes(search.toLowerCase()) ||
              customer.company.toLowerCase().includes(search.toLowerCase())
            )
            .map((customer) => (

              <tr key={customer.id}>

                <td>{customer.name}</td>

                <td>{customer.company}</td>

                <td>{customer.status}</td>

                <td>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}
