import { useState } from "react";

export default function GlobalSearch({
  customers = [],
  leads = [],
  deals = [],
}) {
  const [search, setSearch] = useState("");

  const results = [
    ...customers.map((item) => ({
      type: "Customer",
      name: item.name,
    })),
    ...leads.map((item) => ({
      type: "Lead",
      name: item.name,
    })),
    ...deals.map((item) => ({
      type: "Deal",
      name: item.title,
    })),
  ].filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search customers, leads, deals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,.1)",
          background: "#1e293b",
          color: "white",
          fontSize: "16px",
        }}
      />

      {search && (
        <div
          style={{
            marginTop: "15px",
            background: "#111827",
            borderRadius: "12px",
            padding: "15px",
          }}
        >
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            results.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <strong>{item.name}</strong>
                <br />
                <small>{item.type}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
