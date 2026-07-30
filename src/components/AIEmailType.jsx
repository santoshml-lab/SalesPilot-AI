export default function AIEmailType({
  emailType,
  setEmailType,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        Email Type
      </label>

      <select
        className="search-input"
        value={emailType}
        onChange={(e) =>
          setEmailType(e.target.value)
        }
      >
        <option>Follow-up Email</option>
        <option>Cold Outreach</option>
        <option>Proposal Email</option>
        <option>Meeting Request</option>
        <option>Thank You Email</option>
      </select>
    </div>
  );
}
