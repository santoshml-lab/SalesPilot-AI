import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customer.css";

export default function CustomerTable() {

  const [customers, setCustomers] = useState([]);

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

  return (

    <div className="customer-card">

      <h2>
        Recent Customers
      </h2>

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
