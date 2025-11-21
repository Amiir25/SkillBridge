import { useState } from "react";

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState("");
  const [stats, setStats] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects/student/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId })
      });

      const data = await res.json();
      console.log("Student Dashboard Response:", data);

      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Dashboard Test</h2>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      /><br /><br />

      <button onClick={fetchDashboard}>Load Dashboard</button>

      {stats && (
        <div style={{ marginTop: 20 }}>
          <h3>Dashboard Stats</h3>
          <p>Total Applications: {stats.appliedCount}</p>

          <h4>Applied Projects:</h4>
          {stats.appliedProjects.map((p) => (
            <div key={p._id} style={{ padding: 10, marginBottom: 10, border: "1px solid #ccc" }}>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
