import React, { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./../firebase";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "VEHICLES"));
        const vehiclesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehiclesList);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "VEHICLES", id));
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
        <h2>Vehicles</h2>
        
      </div>

      {/* Header Row */}
      <div style={{ display: 'flex', flexDirection: "row", textAlign: "center" }}>
        <p style={{ width: "20%" }}>ID</p>
        <p style={{ width: "20%" }}>BSX</p>
        <p style={{ width: "20%" }}>Loai Xe</p>
        <p style={{ width: "20%" }}>Mau Xe</p>
        <p style={{ width: "20%" }}>Ten Xe</p>
        <p style={{ width: "20%" }}>Action</p>
      </div>

      {/* Data Rows */}
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} style={{ display: 'flex', flexDirection: "row", textAlign: "center", alignItems: "center" }}>
          <p style={{ width: "20%" }}>{vehicle.id}</p>
          <p style={{ width: "20%" }}>{vehicle.BSX}</p>
          <p style={{ width: "20%" }}>{vehicle.LoaiXe}</p>
          <p style={{ width: "20%" }}>{vehicle.MauXe}</p>
          <p style={{ width: "20%" }}>{vehicle.TenXe}</p>
          <div style={{ width: "20%", display: "flex", justifyContent: "space-around", fontSize: 16, color: "red" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(vehicle.id)}
            >
              <AiFillDelete /> delete
            </span>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Vehicles;
