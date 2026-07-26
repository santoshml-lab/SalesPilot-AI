import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Deals from "./pages/Deals";
import AddDeal from "./pages/AddDeal";

import Customers from "./components/Customers";
import AddCustomer from "./pages/AddCustomer";

import AIAssistant from "./pages/AIAssistant";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function App() {

  const [page, setPage] = useState("login");

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

        {page === "deals" && (
          <Deals
            setPage={setPage}
            setSelectedDeal={setSelectedDeal}
          />
        )}

        {page === "addDeal" && (
          <AddDeal
            setPage={setPage}
            selectedDeal={selectedDeal}
            setSelectedDeal={setSelectedDeal}
          />
        )}

        {page === "customers" && (
          <Customers
            setPage={setPage}
            setSelectedCustomer={setSelectedCustomer}
          />
        )}

        {page === "addCustomer" && (
          <AddCustomer
            setPage={setPage}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />
        )}

        {page === "ai" && <AIAssistant />}

      </div>

    </div>
  );
}



  
  
