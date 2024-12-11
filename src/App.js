import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Icon logout từ react-icons
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Dashboard from "./component/Dashboard";
import AppointmentRepair from "./component/AppointmentRepair";
import Devices from "./component/Devices";
import Services from "./component/Services";
import Users from "./component/Users";
import Vehicles from "./component/Vehicles";
import AddUser from "./component/AddUser";
import EditUser from "./component/EditUser";
import AddService from "./component/AddService";
import EditService from "./component/EditService";
import AddDevice from "./component/AddDevice";
import EditDevice from "./component/EditDevice";
import AppointmentDetail from "./component/AppointmentDetail";

function App() {
  // Hàm logout (có thể thêm logic để logout)
  const handleLogout = () => {
    alert("logout")
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
      </Routes>

      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Sidebar />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>ADMIN</h2>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              <FaSignOutAlt />
            </button>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointment-repair" element={<AppointmentRepair />} />
            <Route path="/appointment/:id" element={<AppointmentDetail />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/add-device" element={<AddDevice />} />
            <Route path="/edit-device/:id" element={<EditDevice />} />
            <Route path="/services" element={<Services />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/edit-service/:id" element={<EditService />} />
            <Route path="/users" element={<Users />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
