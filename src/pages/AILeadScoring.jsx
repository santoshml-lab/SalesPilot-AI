import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "../styles/customers.css";

export default function AILeadScoring() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    const { data } = await supabase
      .from("leads")
      .select("*");

    setLeads(data || []);
  }

  function getScore(lead) {
    let score = 0;

    if (lead.status === "Qualified") score += 50;
    if (lead.status === "Contacted") score += 30;
    if (lead.company) score += 10;
    if (lead.email) score += 10;

    return score;
  }

  function getPriority(score) {
    if (score >= 70)
      return {
        label: "🟢 High",
        color: "#22c55e",
      };

    if (score >= 40)
      return {
        label: "🟡 Medium",
        color: "#f59e0b",
      };

    return {
      label: "🔴 Low",
      color: "#ef4444",
    };
  }

    return (
    <div
      className="customers-page"
      style={{ marginTop: "80px", padding: "30px" }}
    >

      <h1>🤖 AI Lead Scoring</h1>

      <div className="customer-card">

        <table className="customer-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>AI Score</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => {

              const score = getScore(lead);
              const priority = getPriority(score);

              return (
                <tr key={lead.id}>

                  <td>{lead.name}</td>

                  <td>{lead.company}</td>

                  <td>{lead.status}</td>

                  <td>{score}/100</td>

                  <td
                    style={{
                      color: priority.color,
                      fontWeight: "bold",
                    }}
                  >
                    {priority.label}
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );

}
