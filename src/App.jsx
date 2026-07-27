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
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import Analytics from "./pages/Analytics";
import Reminders from "./pages/Reminders";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import AddReminder from "./pages/AddReminder";

export default function App() {

  const [page, setPage] = useState("login");

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

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

        <Navbar setPage={setPage} />

        {page === "dashboard" && <Dashboard setPage={setPage} />}

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
        {page === "leads" && (
  <Leads
    setPage={setPage}
    setSelectedLead={setSelectedLead}
  />
)}

{page === "addLead" && (
  <AddLead
    setPage={setPage}
    selectedLead={selectedLead}
    setSelectedLead={setSelectedLead}
  />
)}

        {page === "ai" && <AIAssistant />}
        {page === "analytics" && <Analytics />}
        {page === "reminders" && <Reminders />}
        {page === "notifications" && <Notifications />}
        {page === "reports" && <Reports />}
        {page === "profile" && <Profile />}
        {page === "calendar" && <Calendar />}
        {page === "addReminder" && <AddReminder setPage={setPage} />}

      </div>

    </div>
  );
}



  
  
