import React, { useState } from "react";
import SideBar from "./components/SideBar";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom"
import AddLead from "./pages/AddLead";
import EditLead from "./pages/EditLead";
import Reports from "./pages/Reports";
import HomePage from "./pages/HomePage.jsx";
import Signin from "./pages/Signin.jsx";
import { useEffect } from "react";
import UserContext from "./AuthContext";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, { withCredentials: true })
        setUser(response.data.user);
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false);
      }
    }
    fetchUser();

  }, [])
  return (
    <>
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/signin"
          element={
            loading
              ? <h1>Loading...</h1>
              : user
                ? <Navigate to="/" replace />
                : <Signin />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={loading ? <h1>Loading...</h1> : user ? <HomePage /> : <Navigate to="/signin" replace />}></Route>
        <Route path="/dashboard" element={loading ? <h1>Loading...</h1> : user ? <Dashboard /> : <Navigate to="/signin" replace />}></Route>
        <Route path="/add-lead" element={loading ? <h1>Loading...</h1> : user ? <AddLead /> : <Navigate to="/signin" replace />}></Route>
        <Route path="/edit-lead/:id" element={loading ? <h1>Loading...</h1> : user ? <EditLead /> : <Navigate to="/signin" replace />}></Route>
        <Route path="/reports" element={loading ? <h1>Loading...</h1> : user ? <Reports /> : <Navigate to="/signin" replace />} />
      </Routes>
    </UserContext.Provider>
    <ToastContainer />
    </>
  )

}
export default App;