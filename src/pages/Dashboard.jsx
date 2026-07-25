import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import CustomerTable from "../components/CustomerTable";

export default function Dashboard() {

  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    loadCustomerCount();
  }, []);

  async function loadCustomerCount() {
    const { count, error } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
    } else {
      setCustomerCount(count);
    }
  }

  return (

    <div className="dashboard">

      <h1>
        Sales Dashboard
      </h1>

      <p>
        Welcome to SalesPilot AI CRM
      </p>

      <div className="stats-container">

        <StatCard
          title="Revenue"
          value="₹2,45,000"
          icon="💰"
        />

        <StatCard
          title="Customers"
          value={customerCount}
          icon="👥"
        />

        <StatCard
          title="Deals"
          value="68"
          icon="💼"
        />

        <StatCard
          title="Conversion"
          value="31%"
          icon="📈"
        />

      </div>

      <SalesChart />
      <CustomerTable />

    </div>

  );

}
