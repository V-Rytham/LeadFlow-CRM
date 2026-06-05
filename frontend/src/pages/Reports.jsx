import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadStatusChart from "../components/LeadStatusChart";

function Reports() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/all"
        );

        setLeads(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeads();
  }, []);

  const chartData = [
    {
      status: "New",
      count: leads.filter(
        (lead) => lead.leadStatus === "New"
      ).length,
    },
    {
      status: "In Progress",
      count: leads.filter(
        (lead) => lead.leadStatus === "In Progress"
      ).length,
    },
    {
      status: "Converted",
      count: leads.filter(
        (lead) => lead.leadStatus === "Converted"
      ).length,
    },
  ];

  return (
    <div className="p-6">
      <LeadStatusChart data={chartData} />
    </div>
  );
}

export default Reports;