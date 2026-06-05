import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    leadStatus: "New",
    website: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/lead",
        formData
      );

      alert("Lead Added Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add lead");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Add New Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the details below to add a new lead.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border p-8"
      >
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Company Name *
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* <div className="flex flex-col gap-2">
            <label className="font-medium">
              Job Title
            </label>

            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Lead Status *
            </label>

            <select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Qualified</option>
              <option>Converted</option>
              <option>Lost</option>
            </select>
          </div>

          {/* <div className="flex flex-col gap-2">
            <label className="font-medium">
              Source
            </label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select source
              </option>
              <option>LinkedIn</option>
              <option>Website</option>
              <option>Referral</option>
              <option>Email Campaign</option>
            </select>
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <label className="font-medium">
              Website
            </label>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <label className="font-medium">
              Expected Close Date
            </label>

            <input
              type="date"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <label className="font-medium">
            Notes
          </label>

          <textarea
            rows="5"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter additional notes..."
            className="border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div className="mt-6 flex flex-col gap-2">
          <label className="font-medium">
            Address
          </label>

          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address..."
            className="border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLead;