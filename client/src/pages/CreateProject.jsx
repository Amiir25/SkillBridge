import { useState } from "react";

export default function CreateProject() {
  const [companyId, setCompanyId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: companyId,
          title,
          description,
        }),
      });

      const data = await res.json();
      console.log("Create Project Response:", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Project Test</h2>

      <input
        placeholder="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      /><br /><br />

      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />

      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
}
