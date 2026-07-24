import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


const data = [
  {
    month: "Jan",
    sales: 50000
  },
  {
    month: "Feb",
    sales: 80000
  },
  {
    month: "Mar",
    sales: 120000
  },
  {
    month: "Apr",
    sales: 150000
  },
  {
    month: "May",
    sales: 200000
  }
];


export default function SalesChart(){

  return (

    <div>

      <h2>
        Sales Growth
      </h2>


      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />


          <Line
            type="monotone"
            dataKey="sales"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>


    </div>

  );

}
