import React, { useState, useEffect } from "react";
import InfoCards from "./InfoCards";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse"

function Main() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);

  const [totalLeads, setTotalLeads] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [converted, setConverted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const calculateStats = (data) => {
    setTotalLeads(data.length);

    setNewLeads(
      data.filter((lead) => lead.leadStatus === "New").length
    );

    setConverted(
      data.filter((lead) => lead.leadStatus === "Converted").length
    );

    setInProgress(
      data.filter(
        (lead) => lead.leadStatus === "In Progress"
      ).length
    );
  };

  const handleAdd = () => {
    navigate("/add-lead");
  };

  const handleEdit = (id) => {
    navigate(`/edit-lead/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/lead/${id}`
      );

      const updatedLeads = leads.filter(
        (lead) => lead._id !== id
      );

      setLeads(updatedLeads);
      calculateStats(updatedLeads);
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/all"
        );

        const leadsData = response.data.data;

        setLeads(leadsData);
        calculateStats(leadsData);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchDetails();
  }, []);

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.companyName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        lead.leadStatus === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });


  const handleCSVDownload = () => {
    function exportCSV() {
      const csv = Papa.unparse(leads);

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    exportCSV()
  }
  return (
    <div className="min-h-screen bg-gray-50 w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 p-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back!
          </h1>

          <p className="text-gray-600 mt-2">
            Here's what's happening with your leads today
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
        >
          Add New Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6">
        <InfoCards
          card={{
            name: "Total Leads",
            value: totalLeads,
          }}
        />

        <InfoCards
          card={{
            name: "New Leads",
            value: newLeads,
          }}
        />

        <InfoCards
          card={{
            name: "Converted",
            value: converted,
          }}
        />

        <InfoCards
          card={{
            name: "In Progress",
            value: inProgress,
          }}
        />
      </div>

      <div className="px-6 mt-8">
        <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 md:justify-between">

          <input
            type="text"
            placeholder="Search by name or company..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-3 py-2 w-full md:w-80"
          />

          <div className="flex flex-wrap gap-3">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="All">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Converted">
                Converted
              </option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="asc">
                Name A-Z
              </option>

              <option value="desc">
                Name Z-A
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="px-6 mt-8 pb-10">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="px-5 py-4 border-b flex justify-between">
            <h2 className="text-lg font-semibold">
              Recent Leads
            </h2>
            <a className="cursor-pointer text-red-400" onClick={handleCSVDownload}> Download as CSV</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3">
                    Name
                  </th>

                  <th className="text-left px-4 py-3">
                    Email
                  </th>

                  <th className="text-left px-4 py-3">
                    Phone Number
                  </th>

                  <th className="text-left px-4 py-3">
                    Company Name
                  </th>

                  <th className="text-left px-4 py-3">
                    Status
                  </th>

                  <th className="text-left px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {lead.name}
                      </td>

                      <td className="px-4 py-3">
                        {lead.email}
                      </td>

                      <td className="px-4 py-3">
                        {lead.phoneNumber}
                      </td>

                      <td className="px-4 py-3">
                        {lead.companyName}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-md text-sm ${lead.leadStatus ===
                              "Converted"
                              ? "bg-green-100 text-green-700"
                              : lead.leadStatus ===
                                "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                        >
                          {lead.leadStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              handleEdit(
                                lead._id
                              )
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                lead._id
                              )
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      No Leads Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Main;