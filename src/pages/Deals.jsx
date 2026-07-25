import "../styles/customers.css";

export default function Deals() {

  const deals = [
    {
      client: "TechCorp",
      value: "₹50,000",
      status: "Won",
    },
    {
      client: "StartupX",
      value: "₹1,20,000",
      status: "Negotiation",
    },
    {
      client: "WebSolutions",
      value: "₹75,000",
      status: "Lost",
    },
  ];

  return (
    <div className="customers-page">

      <div className="customers-header">
        <h1>Deals</h1>

        <button>Add Deal</button>
      </div>

      <table className="customers-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Deal Value</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {deals.map((deal, index) => (
            <tr key={index}>
              <td>{deal.client}</td>
              <td>{deal.value}</td>
              <td>{deal.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

