import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function AddLead({
  setPage,
  selectedLead,
  setSelectedLead,
}) {

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("Website");
  const [status, setStatus] = useState("New");
  const [score, setScore] = useState(50);

  useEffect(() => {
    if (selectedLead) {
      setName(selectedLead.name || "");
      setCompany(selectedLead.company || "");
      setSource(selectedLead.source || "Website");
      setStatus(selectedLead.status || "New");
      setScore(selectedLead.score || 50);
    }
  }, [selectedLead]);

  async function saveLead() {

    if (!name || !company) {
      alert("Please fill all fields");
      return;
    }

    if (selectedLead) {

      const { error } = await supabase
        .from("leads")
        .update({
          name,
          company,
          source,
          status,
          score,
        })
        .eq("id", selectedLead.id);

      if (error) {
        alert(error.message);
      } else {
        alert("Lead Updated Successfully");
        setSelectedLead(null);
        setPage("leads");
      }

    } else {

      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name,
            company,
            source,
            status,
            score,
          },
        ]);

      if (error) {
        alert(error.message);
      } else {
        alert("Lead Added Successfully");
        setPage("leads");
      }

    }

  }

  return (
    <div
      className="customers-page"
      style={{ marginTop: "90px", padding: "30px" }}
    >

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#111827",
          padding: "30px",
          borderRadius: "15px",
        }}
      >

        <h1 style={{ marginBottom: "25px" }}>
          {selectedLead ? "✏️ Edit Lead" : "📈 Add Lead"}
        </h1>

        <input
          className="search-input"
          placeholder="Lead Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <br /><br />

        <select
          className="search-input"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option>Website</option>
          <option>Facebook</option>
          <option>LinkedIn</option>
          <option>Referral</option>
          <option>Instagram</option>
        </select>

        <br /><br />

        <select
          className="search-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <br /><br />

        <input
          type="number"
          className="search-input"
          placeholder="Lead Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <br /><br />

        <button
          onClick={saveLead}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {selectedLead ? "Update Lead" : "Save Lead"}
        </button>

      </div>

    </div>
  );
}
