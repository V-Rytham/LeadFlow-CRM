import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">
          LeadFlow CRM
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Reports
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Manage Your Leads
          <span className="text-blue-700"> Smarter</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Track leads, monitor conversions, manage
          customer relationships and gain insights
          through powerful analytics.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Open Dashboard
          </button>

          <button
            onClick={() => navigate("/add-lead")}
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            Add Lead
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-blue-700">
              500+
            </h2>
            <p className="text-gray-500 mt-2">
              Leads Managed
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-green-600">
              120+
            </h2>
            <p className="text-gray-500 mt-2">
              Conversions
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-purple-600">
              85%
            </h2>
            <p className="text-gray-500 mt-2">
              Growth Rate
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-3">
              Lead Management
            </h3>

            <p className="text-gray-600">
              Add, edit and organize all your leads
              in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-3">
              Analytics
            </h3>

            <p className="text-gray-600">
              Visualize lead performance with
              charts and reports.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-3">
              CRM Workflow
            </h3>

            <p className="text-gray-600">
              Track lead progress from New to
              Converted.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        Built with React, Express, MongoDB and Tailwind CSS
      </footer>
    </div>
  );
}

export default HomePage;