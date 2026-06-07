import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  BarChart3,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Add Lead",
      path: "/add-lead",
      icon: <UserPlus size={18} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between h-screen shadow-xl">
      {/* Top Section */}
      <div>
        <div className="px-6 py-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-wide">
            LeadManager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            CRM Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                  ${
                    active
                      ? "bg-blue-600 shadow-md"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800">
        <SignOutButton />
      </div>
    </aside>
  );
}

export default SideBar;