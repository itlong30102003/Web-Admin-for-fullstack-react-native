import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { AiFillMinusSquare } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function AppointmentRepair() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "APPOINTMENT_REPAIR"));
        const appointmentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsList);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateDoc(doc(db, "APPOINTMENT_REPAIR", id), { status: "accepted" });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "accepted" } : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status: ", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateDoc(doc(db, "APPOINTMENT_REPAIR", id), { status: "rejected" });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "rejected" } : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status: ", error);
    }
  };

  const handleAppointmentClick = (id) => {
    navigate(`/appointment/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <h2>Appointment Repair</h2>
      </div>

      {/* Header Row */}
      <div style={{ display: "flex", flexDirection: "row", textAlign: "center" }}>
        <p style={{ width: "20%" }}>ID</p>
        <p style={{ width: "20%" }}>USER</p>
        <p style={{ width: "20%" }}>Time</p>
        <p style={{ width: "20%" }}>Service</p>
        <p style={{ width: "20%" }}>Actions</p>
      </div>

      {/* Data Rows */}
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
          }}
          onClick={() => handleAppointmentClick(appointment.id)}
        >
          <p style={{ width: "20%" }}>{appointment.id}</p>
          <p style={{ width: "20%" }}>{appointment.Appointment_By}</p>
          <p style={{ width: "20%" }}>
            {new Date(appointment.ThoiGian.seconds * 1000).toLocaleString()}
          </p>
          <p style={{ width: "20%" }}>
            {appointment.DichVu.map((service, index) => (
              <span key={index}>
                {service.value}
                {index < appointment.DichVu.length - 1 && ", "}
              </span>
            ))}
          </p>
          <div style={{ width: "20%", display: "flex", justifyContent: "center", fontSize: 16, gap: "10px" }}>
            <span
              style={{
                color: appointment.status === "rejected" ? "red" : "gray",
                cursor: appointment.status === "rejected" ? "not-allowed" : "pointer",
              }}
              onClick={() => handleReject(appointment.id)}
            >
              <AiFillMinusSquare size={24} />
            </span>
            <span
              style={{
                color: appointment.status === "accepted" ? "green" : "gray",
                cursor: appointment.status === "accepted" ? "not-allowed" : "pointer",
              }}
              onClick={() => handleAccept(appointment.id)}
            >
              <AiOutlineCheckSquare size={24} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentRepair;
