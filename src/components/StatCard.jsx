import "../styles/statcard.css";

export default function StatCard({ title, value, icon }) {

  return (

    <div className="stat-card">

      <h3>
        {icon} {title}
      </h3>

      <h2>
        {value}
      </h2>

    </div>

  );

}
export default function StatCard({ title, value, icon }) {

  return (

    <div>

      <h3>
        {icon} {title}
      </h3>

      <h2>
        {value}
      </h2>

    </div>

  );

}
