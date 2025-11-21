import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Apply() {
  const { projectId } = useParams(); // Get project ID from URL
  const [studentId, setStudentId] = useState("");
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch project details
  const fetchProject = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects/all");
      const data = await res.json();

      // Find the selected project
      const found = data.projects.find((p) => p._id === projectId);
      setProject(found);
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleApply = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/apply/${projectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply to Project</h1>

      {/* Project Card */}
      {project && (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-5 w-full max-w-xl mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{project.title}</h2>
          <p className="text-gray-700 mt-2">{project.description}</p>

          <h3 className="font-medium text-gray-900 mt-4">Skills Required:</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.skillsRequired?.map((skill, index) => (
              <span
                key={index}
                className="text-sm bg-gray-200 text-gray-900 px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="text-gray-900 font-medium mt-3">
            Reward: <span className="font-normal">{project.reward}</span>
          </p>
        </div>
      )}

      {/* Apply Form */}
      <div className="w-full max-w-xl bg-white p-5 shadow-md border border-gray-200 rounded-lg">
        <input
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          onClick={handleApply}
          className="w-full py-2 text-white rounded-md bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 transition"
        >
          Apply
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-900 font-medium">{message}</p>
        )}
      </div>

    </div>
  );
}