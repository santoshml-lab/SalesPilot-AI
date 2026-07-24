import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {

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
          value="1,284"
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

    </div>

  );

}
