import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customer.css";

export default function Customers({
  setPage,
  setSelectedCustomer,
}) {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setCustomers(data);
    }
  }

  async function deleteCustomer(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Customer deleted successfully");
      fetchCustomers();
    }
  }

  return (

    <div
      className="customer-card"
      style={{
        marginTop: "90px",
        padding: "30px"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >

        <h1>👥 Customers</h1>

        <button
          onClick={() => {
            setSelectedCustomer(null);
            setPage("addCustomer");
          }}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          + Add Customer
        </button>

      </div>

      <input
        className="search-box-customer"
        type="text"
        placeholder="🔍 Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <table className="customer-table">

  <thead>
    <tr>
      <th>Name</th>
      <th>Company</th>
      <th>Email</th>
      <th>Phone</th>
      <th>City</th>
      <th>Type</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>

    {customers
      .filter(
        (customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.company.toLowerCase().includes(search.toLowerCase())
      )
      .map((customer) => (

        <tr key={customer.id}>

          <td>{customer.name}</td>
          <td>{customer.company}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>{customer.city}</td>
          <td>{customer.customer_type}</td>
          <td>{customer.status}</td>

          <td>

            <button
              onClick={() => {
                setSelectedCustomer(customer);
                setPage("addCustomer");
              }}
              style={{
                background: "#f59e0b",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteCustomer(customer.id)}
              style={{
                marginLeft: "10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
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



        
    
    

    
    
     
                  
          
      

        

        

          
                
                  

                
                      
                      
                    
                      
                      
                  
                  
                    
                    
                      
                      
                      
                    
                  

