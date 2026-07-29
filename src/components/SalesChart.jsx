import "../styles/chart.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function SalesChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const { data: deals } = await supabase
      .from("deals")
      .select("amount,status,created_at");

    if (!deals) return;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const result = {};

    deals.forEach((deal) => {
      if (deal.status !== "Won") return;

      const month = months[new Date(deal.created_at).getMonth()];
      result[month] = (result[month] || 0) + Number(deal.amount);
    });

    setData(
      Object.keys(result).map((month) => ({
        month,
        sales: result[month],
      }))
    );
  }

  return (
    <div className="chart-card">
      <h2>Sales Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Sales",
            ]}
          />
          <Line
            type="monotone"
            dataKey="sales"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
