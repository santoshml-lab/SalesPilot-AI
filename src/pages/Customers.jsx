import "../styles/customers.css";

export default function Customers() {

  const customers = [
    {
      name: "Rahul Sharma",
      company: "TechCorp",
      email: "rahul@gmail.com",
      status: "Active",
    },
    {
      name: "Priya Singh",
      company: "StartupX",
      email: "priya@gmail.com",
      status: "Pending",
    },
    {
      name: "Amit Kumar",
      company: "WebSolutions",
      email: "amit@gmail.com",
      status: "Active",
    },
  ];

  return (
    <div className="customers-page">

      <div className="customers-header">
        <h1>Customers</h1>

        <button>Add Customer</button>
      </div>

      <input
        className="search-input"
        placeholder="Search customers..."
      />

      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.company}</td>
              <td>{customer.email}</td>
              <td>{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
