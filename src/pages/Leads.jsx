import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function Leads({
  setPage,
  setSelectedLead,
}) {

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setLeads(data);
    }
  }

  async function deleteLead(id) {

    if (!window.confirm("Delete this lead?")) return;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchLeads();
    }
  }

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >

        <h1>📈 Leads</h1>

        <button
          onClick={() => {
            setSelectedLead(null);
            setPage("addLead");
          }}
        >
          + Add Lead
        </button>

      </div>

      <input
        className="search-input"
        placeholder="Search Lead..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="customers-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Source</th>
            <th>Status</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {leads
            .filter(
              (lead) =>
                lead.name.toLowerCase().includes(search.toLowerCase()) ||
                lead.company.toLowerCase().includes(search.toLowerCase())
            )
            .map((lead) => (

              <tr key={lead.id}>

                <td>{lead.name}</td>
                <td>{lead.company}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>
                <td>{lead.score}</td>

                <td>

                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setPage("addLead");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}
