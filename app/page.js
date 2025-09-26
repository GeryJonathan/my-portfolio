"use client";

import { useState } from "react";
import portfolio from "@/data/portfolio.json";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white min-h-[70vh] flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 py-20 w-full">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-16 flex justify-center">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-64 md:w-80 object-contain rounded-xl transition duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              {portfolio.name}
            </h1>
            <h2 className="text-2xl font-semibold opacity-90">
              {portfolio.title}
            </h2>
            <p className="max-w-2xl text-lg opacity-95 leading-relaxed">
              {portfolio.about}
            </p>
            <a
              href="#projects"
              className="inline-block mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-gray-100 transition"
            >
              View My Work ↓
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Skills */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded"></span> Skills
          </h2>
          <ul className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill, i) => (
              <li
                key={i}
                className="px-5 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-indigo-500 rounded"></span> Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.projects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden group"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Detail Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full relative animate-fadeIn">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-56 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline"
                  >
                    🔗 View Project
                  </a>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Contact */}
        {portfolio.contact && (
          <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 text-lg">
              <a
                href={`mailto:${portfolio.contact.email}`}
                className="text-blue-600 hover:underline"
              >
                📧 {portfolio.contact.email}
              </a>
              <a
                href={portfolio.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                💻 GitHub
              </a>
              <a
                href={portfolio.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                🔗 LinkedIn
              </a>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to know more about me?
          </h2>
          <p className="text-blue-600 font-medium text-lg">
            💬 Ask my chatbot in the corner →
          </p>
        </section>
      </div>
    </main>
  );
}
