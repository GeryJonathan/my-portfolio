"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolio from "@/data/portfolio.json";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null); // for zoom mode

  const categories = [...new Set(portfolio.projects.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white min-h-[70vh] flex items-center overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_60%)] animate-pulse" />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 py-20 w-full">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 mb-8 md:mb-0 md:mr-16 flex justify-center"
          >
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-64 md:w-80 object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6"
          >
            <h1 className="text-5xl font-extrabold drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              {portfolio.name}
            </h1>
            <h2 className="text-2xl font-medium opacity-90">{portfolio.title}</h2>
            <p className="max-w-2xl text-lg opacity-95 leading-relaxed">
              {portfolio.about}
            </p>
            <a
              href="#projects"
              className="inline-block mt-6 px-8 py-3 bg-white/90 text-indigo-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-white transition transform hover:-translate-y-1"
            >
              View My Work ↓
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></span>
            Skills
          </h2>
          <ul className="flex flex-wrap gap-4">
            {portfolio.skills.map((skill, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Projects by Category */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded"></span>
            Projects
          </h2>

          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-gray-700">
                {category}
              </h3>
              <div className="grid md:grid-cols-2 gap-10">
                {portfolio.projects
                  .filter((p) => p.category === category)
                  .map((project, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-indigo-600 transition">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Contact */}
        {portfolio.contact && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Get in Touch
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
              <a
                href={`mailto:${portfolio.contact.email}`}
                className="text-indigo-600 hover:underline"
              >
                📧 {portfolio.contact.email}
              </a>
              <a
                href={portfolio.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                💻 GitHub
              </a>
              <a
                href={portfolio.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                🔗 LinkedIn
              </a>
            </div>
          </motion.section>
        )}

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to know more about me?
          </h2>
          <p className="text-indigo-600 font-medium text-lg">
            💬 Ask my chatbot in the corner →
          </p>
        </motion.section>
      </div>

      {/* ⬇️ MOVED Project Detail Modal HERE ⬇️ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)} // Closes modal on background click
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                &times;
              </button>

              {/* Main Image */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing modal
                  setZoomedImage(selectedProject.image);
                }}
                className="w-full h-64 object-cover rounded-xl mb-6 cursor-zoom-in hover:opacity-90 transition"
              />

              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedProject.details || selectedProject.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tools.map((tool, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Gallery */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Gallery</h4>
                  <div className="flex overflow-x-auto gap-3 pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {selectedProject.gallery.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${selectedProject.title} screenshot ${idx + 1}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent closing modal
                          setZoomedImage(img);
                        }}
                        className="h-32 min-w-[8rem] object-cover rounded-lg cursor-zoom-in transition flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* External Links Container */}
              <div className="flex flex-wrap gap-4 mt-8">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    🔗 View Project
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-gray-800 text-white rounded-full shadow hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    💻 View on GitHub
                  </a>
                )}
                {selectedProject.youtube && (
                  <a
                    href={selectedProject.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-red-600 text-white rounded-full shadow hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    ▶️ Watch Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔍 Zoomed Image Lightbox */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            key="zoomed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4"
            onClick={() => setZoomedImage(null)} // close when clicking background
          >
            <motion.img
              src={zoomedImage}
              alt="Zoomed"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[90vh] max-w-5xl object-contain rounded-xl shadow-2xl cursor-zoom-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}