import portfolio from "@/data/portfolio.json";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-blue-600 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">{portfolio.name}</h1>
        <h2 className="text-2xl font-medium mb-6">{portfolio.title}</h2>
        <p className="max-w-2xl text-lg opacity-90">{portfolio.about}</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Skills */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <p className="text-lg text-gray-700 mb-4">
            Want to know more about me?
          </p>
          <p className="text-blue-600 font-medium">
            💬 Ask my chatbot in the corner →
          </p>
        </section>
      </div>
    </main>
  );
}
