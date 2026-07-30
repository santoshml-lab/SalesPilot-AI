import "../styles/chart.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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

    <h2>📈 Monthly Sales Growth</h2>

    <ResponsiveContainer width="100%" height={350}>

      <AreaChart data={data}>

        <defs>

          <linearGradient
            id="salesColor"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#2563eb"
              stopOpacity={0.8}
            />

            <stop
              offset="95%"
              stopColor="#2563eb"
              stopOpacity={0}
            />

          </linearGradient>

        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis
          tickFormatter={(value) =>
            `₹${value / 1000}k`
          }
        />

        <Tooltip
          formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Sales",
          ]}
        />

        <Area
  type="monotone"
  dataKey="sales"
  stroke="#3b82f6"
  strokeWidth={3}
  fill="#3b82f6"
  fillOpacity={0.35}
/>
          
          
          

        <Line
  type="monotone"
  dataKey="sales"
  stroke="#60a5fa"
  strokeWidth={4}
  dot={{ r: 6, fill: "#60a5fa" }}
  activeDot={{ r: 8 }}
/>
          
          
  
          
          

      </AreaChart>

    </ResponsiveContainer>

  </div>
);
    
      

      
        
          
          
          
