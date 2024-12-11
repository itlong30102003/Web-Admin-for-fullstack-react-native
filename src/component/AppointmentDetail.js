import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [technician, setTechnician] = useState(""); // This will hold the selected technician ID
  const [technicians, setTechnicians] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const docSnap = await getDoc(doc(db, "APPOINTMENT_REPAIR", id));
        if (docSnap.exists()) {
          const appointmentData = docSnap.data();
          setAppointment(appointmentData);
          // If there's an assigned technician, set it as the default value in the dropdown
          setTechnician(appointmentData.technician);
        } else {
          console.log("No such document!");
          navigate("/appointments");
        }
      } catch (error) {
        console.error("Error fetching appointment: ", error);
      }
    };

    const fetchTechnicians = async () => {
      try {
        const q = query(collection(db, "USERS"), where("role", "==", "technician"));
        const querySnapshot = await getDocs(q);
        const technicianList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().fullName,
          lever: doc.data().lever
        }));
        setTechnicians(technicianList);
      } catch (error) {
        console.error("Error fetching technicians: ", error);
      }
    };

    fetchAppointment();
    fetchTechnicians();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!technician) {
      alert("Please select a technician!");
      return;
    }

    try {
      await updateDoc(doc(db, "APPOINTMENT_REPAIR", id), {
        technician,
      });
      alert("Appointment updated successfully!");
      navigate("/appointment-repair");
    } catch (error) {
      console.error("Error updating appointment: ", error);
      alert("Error updating appointment!");
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Appointment</h2>
      <div style={styles.container}>
        <div style={styles.leftColumn}>
          {/* Appointment Details */}
          <p><strong>ID:</strong> {appointment.id}</p>
          <p><strong>Dealer:</strong> Hồng Nhung #1</p>
          <p><strong>Time:</strong> {new Date(appointment.ThoiGian.seconds * 1000).toLocaleString()}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Vehicle:</strong> {appointment.Xe.TenXe}</p>
          <p><strong>Total Cost:</strong> {appointment.TotalCost} VND</p>
        </div>
        
        <div style={styles.rightColumn}>
          {/* Technician Level Notes */}
          <h3>Lưu ý: chọn nhân viên theo cấp độ công việc:</h3>
          <p><strong>Level 1:</strong> Dịch vụ nhỏ và thay dầu</p>
          <p><strong>Level 2:</strong> Dịch vụ bảo hành và thay phụ tùng</p>
          <p><strong>Level 3:</strong> Dịch vụ sửa chữa nặng</p>
        </div>
      </div>

      {/* Technician Assignment */}
      <div style={styles.selectContainer}>
        <label htmlFor="technician">Assign Technician</label>
        <select
          id="technician"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)} // Update technician when a new one is selected
          style={styles.select}
        >
          <option value="">Select Technician</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name} - Lever: {tech.lever}
            </option>
          ))}
        </select>
      </div>
    
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button
            onClick={handleUpdate}
            style={styles.button}
        >
            Update Appointment
        </button>

        {/* Back Button */}
        <button
            onClick={() => navigate("/appointment-repair")}
            style={{ ...styles.button, backgroundColor: "#f44336" }}
        >
            Back to Appointments
        </button>
    </div>

    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px'
  },
  leftColumn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#f9f9f9'
  },
  rightColumn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#f9f9f9'
  },
  selectContainer: {
    margin: '20px 0',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    width: '30%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px'
  }
};

export default AppointmentDetail;
