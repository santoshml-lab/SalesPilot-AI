import { useEffect, useState } from "react";
import "../styles/statcard.css";

export default function StatCard({
  title,
  value,
  icon,
  trend = "+12%"
}) {

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {

    const number = Number(
      String(value).replace(/[₹,%]/g, "").replace(/,/g, "")
    );

    if (isNaN(number)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;

    const increment = Math.ceil(number / 40);

    const timer = setInterval(() => {

      start += increment;

      if (start >= number) {
        start = number;
        clearInterval(timer);
      }

      setDisplayValue(start);

    }, 20);

    return () => clearInterval(timer);

  }, [value]);

  return (

    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="trend">
          {trend}
        </span>

      </div>

      <h3>{title}</h3>

      <h2>
        {typeof displayValue === "number"
          ? String(value).includes("₹")
            ? `₹${displayValue.toLocaleString()}`
            : String(value).includes("%")
            ? `${displayValue}%`
            : displayValue
          : displayValue}
      </h2>

    </div>

  );

}
