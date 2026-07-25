import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import AddDeal from "./pages/AddDeal";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {

  const [page, setPage] = useState("login");

  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }

  return (
    <div style={{ display: "flex" }}>

      <Sidebar setPage={setPage} />

      <div style={{ flex: 1 }}>

        <Navbar />

        {page === "dashboard" && <Dashboard />}
        {page === "deals" && <Deals setPage={setPage} />}
        {page === "addDeal" && <AddDeal setPage={setPage} />}

      </div>

    </div>
  );
}



  
  
