import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./../firebase";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Devices() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "DEVICES"));
        const devicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDevices(devicesList);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchDevices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "DEVICES", id));
      setDevices(devices.filter((device) => device.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-device/${id}`);
  };

  const handleAddDevice = () => {
    navigate("/add-device");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>Devices</h2>
        <p style={{ fontSize: 25, cursor: "pointer" }} onClick={handleAddDevice}>
          <AiOutlinePlus />
        </p>
      </div>

      {/* Header Row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        <p style={{ width: "30%" }}>Device Name</p>
        <p style={{ width: "30%" }}>Price</p>
        <p style={{ width: "20%" }}>Image</p>
        <p style={{ width: "20%" }}>Action</p>
      </div>

      {/* Data Rows */}
      {devices.map((device) => (
        <div
          key={device.id}
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <p style={{ width: "30%" }}>{device.Name}</p>
          <p style={{ width: "30%" }}>{device.Price.toLocaleString("vi-VN")} VND</p>
          <div style={{ width: "20%" }}>
            <img
              src={device.Image}
              alt={device.Name}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: "20%",
              display: "flex",
              justifyContent: "space-around",
              fontSize: 20,
              color: "red",
            }}
          >
            <span style={{ cursor: "pointer" }} onClick={() => handleDelete(device.id)}>
              <AiFillDelete /> delete
            </span>
            <span style={{ cursor: "pointer" }} onClick={() => handleEdit(device.id)}>
              <AiFillEdit /> update
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Devices;
