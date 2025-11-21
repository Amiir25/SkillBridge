import { useState } from "react";

export default function CompanyDashboard() {
  const [companyId, setCompanyId] = useState("");
  const [stats, setStats] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects/company/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId })
      });

      const data = await res.json();
      console.log("Dashboard Response:", data);

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Company Dashboard Test</h2>

      <input
        placeholder="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      /><br /><br />

      <button onClick={fetchDashboard}>Load Dashboard</button>

      {stats && (
        <div style={{marginTop: 20}}>
          <h3>Dashboard Stats</h3>
          <p>Active Posts: {stats.activePosts}</p>
          <p>Total Applications: {stats.totalApplications}</p>
          <p>Profile Views: {stats.profileViews}</p>
        </div>
      )}
    </div>
  );
}
