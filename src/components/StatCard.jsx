import "../styles/statcard.css";

export default function StatCard({ title, value, icon }) {

  return (

    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <h2>
          {value}
        </h2>

      </div>

    </div>

  );

}
