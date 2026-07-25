import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

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
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />
        <Dashboard />
      </div>

    </div>
  );
}


  
  
