import "../styles/customer.css";
export default function CustomerTable(){

  const customers = [
    {
      name:"Rahul Sharma",
      company:"TechCorp",
      status:"Active"
    },
    {
      name:"Priya Singh",
      company:"StartupX",
      status:"Pending"
    },
    {
      name:"Amit Kumar",
      company:"WebSolutions",
      status:"Active"
    }
  ];


  return (

    <div className="customer-card">

      <h2>
        Recent Customers
      </h2>


      <table className="customer-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
          </tr>

        </thead>


        <tbody>

          {
            customers.map((customer,index)=>(

              <tr key={index}>

                <td>
                  {customer.name}
                </td>

                <td>
                  {customer.company}
                </td>

                <td>
                  {customer.status}
                </td>

              </tr>

            ))
          }

        </tbody>


      </table>


    </div>

  );

}
