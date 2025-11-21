import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/projects/all");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-24 xl:px-32 py-8">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Available Projects
      </h1>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200">

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-gray-700 mb-3">
                {project.description}
              </p>

              {/* Skills */}
              <div className="mb-3">
                <h3 className="font-medium text-gray-900">Skills Required:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {
                    project.skillsRequired?.map((skill, index) => (
                      <span
                        key={index}
                        className="text-sm bg-gray-200 text-gray-900 px-2 py-1 rounded-md">
                        { skill }
                      </span>
                    ))
                  }
                </div>
              </div>

              {/* Reward */}
              <p className="text-gray-800 font-medium">
                Reward: <span className="text-gray-900">{project.reward}</span>
              </p>

              {/* Apply Button */}
              <Link to={'/apply'}>
                <button className="mt-4 w-full py-2 text-white rounded-md bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 transition cursor-pointer">
                  Apply
                </button>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  );
}
