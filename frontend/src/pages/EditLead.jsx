import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    leadStatus: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/search-lead/${id}`
        );

        setLead(response.data.lead);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/update-lead/${id}`,
        lead, 
        {withCredentials: true}
      );

      alert("Lead updated successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading Lead...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border">
        
        {/* Header */}
        <div className="border-b px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Edit Lead
            </h1>

            <p className="text-gray-500 mt-1">
              Update lead information and status
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={lead.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={lead.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneNumber"
              value={lead.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="companyName"
              value={lead.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Lead Status
            </label>

            <select
              name="leadStatus"
              value={lead.leadStatus}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="New">New</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Converted">
                Converted
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-3 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLead;