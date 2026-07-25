import "../styles/customers.css";

export default function Leads() {

  const leads = [
    {
      name: "Rohan Verma",
      company: "NextGen Pvt Ltd",
      stage: "New"
    },
    {
      name: "Anjali Gupta",
      company: "TechSoft",
      stage: "Qualified"
    },
    {
      name: "Karan Singh",
      company: "Vision Labs",
      stage: "Proposal"
    }
  ];

  return (
    <div className="customers-page">

      <div className="customers-header">
        <h1>Leads</h1>
        <button>Add Lead</button>
      </div>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Stage</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
