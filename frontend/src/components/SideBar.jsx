import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOutButton from "./SignOutButton";
function SideBar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const getButtonClass = (name) =>
    `cursor-pointer py-2 px-3 rounded-lg transition-colors duration-200 ${
      active === name
        ? "bg-blue-500 text-white"
        : "hover:bg-blue-800"
    }`;

  return (
    <div className="flex flex-col justify-between bg-blue-900 w-[150px] text-white h-screen">
      <div className="flex flex-col">
      <h1 className="my-[20px] ml-5 text-lg font-semibold">
        LeadManager
      </h1>

      <div className="flex flex-col gap-3 px-2">
        <button
          onClick={() => {
            setActive("Dashboard")
            naviagte("/dashboard")
          }}
          className={getButtonClass("Dashboard")}
        >
          Dashboard
        </button>

        <button
          onClick={() => {
            setActive("Add Lead")
            navigate("/add-lead")
          }}
          className={getButtonClass("Add Lead")}
        >
          Add Lead
        </button>

        <button
          onClick={() => {
            setActive("Reports")
            navigate("/reports")
          }}
          className={getButtonClass("Reports")}

        >
          Reports
        </button>
      </div>
      </div>
      <SignOutButton/>

    </div>
  );
}

export default SideBar;