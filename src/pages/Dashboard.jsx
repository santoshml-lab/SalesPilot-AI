import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import CustomerTable from "../components/CustomerTable";

export default function Dashboard() {

  const [customerCount, setCustomerCount] = useState(0);
  const [dealCount, setDealCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadCustomerCount();
    loadDeals();
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

  async function loadDeals() {

  const { data, error } = await supabase
    .from("deals")
    .select("*");

  console.log("Deals:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert(JSON.stringify(data));

  setDealCount(data.length);

  const totalRevenue = data.reduce((sum, deal) => {
    return deal.status === "Won"
      ? sum + Number(deal.amount)
      : sum;
  }, 0);

  setRevenue(totalRevenue);
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
          value={`₹${revenue.toLocaleString("en-IN")}`}
          icon="💰"
        />

        <StatCard
          title="Customers"
          value={customerCount}
          icon="👥"
        />

        <StatCard
          title="Deals"
          value={dealCount}
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
