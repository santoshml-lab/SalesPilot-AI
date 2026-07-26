import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {

  const [customerCount, setCustomerCount] = useState(0);
  const [dealCount, setDealCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [conversion, setConversion] = useState("0%");

  useEffect(() => {
    loadCustomerCount();
    loadDeals();
    loadConversion();
  }, []);

  async function loadCustomerCount() {
    const { count, error } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    if (!error) {
      setCustomerCount(count);
    }
  }

  async function loadDeals() {
    const { data, error } = await supabase
      .from("deals")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setDealCount(data.length);

    const totalRevenue = data.reduce((sum, deal) => {
      return deal.status === "Won"
        ? sum + Number(deal.amount)
        : sum;
    }, 0);

    setRevenue(totalRevenue);
  }

  async function loadConversion() {
    const { count: leadCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    const { count: wonDeals } = await supabase
      .from("deals")
      .select("*", { count: "exact", head: true })
      .eq("status", "Won");

    if (leadCount > 0) {
      const percent = ((wonDeals / leadCount) * 100).toFixed(1);
      setConversion(`${percent}%`);
    } else {
      setConversion("0%");
    }
  }

  return (
    <div className="dashboard">

      <h1>Sales Dashboard</h1>

      <p>Welcome to SalesPilot AI CRM</p>

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
          value={conversion}
          icon="📈"
        />

      </div>

      <SalesChart />

    </div>
  );
}
