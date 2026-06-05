import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import Main from "../components/Main.jsx";
function Dashboard() {
  return (
    <div className="flex">
        <SideBar />
        <Main></Main>
    
    </div>
  );
}

export default Dashboard;