
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
