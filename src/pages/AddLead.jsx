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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("Website");
  const [status, setStatus] = useState("New");
  const [score, setScore] = useState(50);
  const [followUpDate, setFollowUpDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (selectedLead) {
      setName(selectedLead.name || "");
      setCompany(selectedLead.company || "");
      setEmail(selectedLead.email || "");
      setPhone(selectedLead.phone || "");
      setSource(selectedLead.source || "Website");
      setStatus(selectedLead.status || "New");
      setScore(selectedLead.score || 50);
      setFollowUpDate(selectedLead.follow_up_date || "");
      setAssignedTo(selectedLead.assigned_to || "");
      setNotes(selectedLead.notes || "");
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
          email,
          phone,
          source,
          status,
          score: autoScore,
          follow_up_date: followUpDate,
          assigned_to: assignedTo,
          notes,
          
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
      let autoScore = 50;

if (status === "New") autoScore = 60;
if (status === "Contacted") autoScore = 75;
if (status === "Qualified") autoScore = 90;
if (status === "Proposal") autoScore = 85;
if (status === "Won") autoScore = 100;
if (status === "Lost") autoScore = 20;

      
        
        
    .insert([
          {
            name,
            company,
            email,
            phone,
            source,
            status,
            score,
            follow_up_date: followUpDate,
            assigned_to: assignedTo,
            notes,
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

        <input
          className="search-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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

        <input
          type="date"
          className="search-input"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
        />

        <br /><br />

        <input
          className="search-input"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <br /><br />

        <textarea
          className="search-input"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
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

  
