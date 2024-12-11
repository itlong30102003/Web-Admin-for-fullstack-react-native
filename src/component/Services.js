import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./../firebase";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "SERVICES"));
        const servicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesList);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "SERVICES", id));
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-service/${id}`);
  };

  const handleAddService = () => {
    navigate("/add-service");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <h2>Services</h2>
        <p style={{ fontSize: 25, cursor: "pointer" }} onClick={handleAddService}>
          <AiOutlinePlus />
        </p>
      </div>

      {/* Header Row */}
      <div style={{ display: "flex", flexDirection: "row", textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
        <p style={{ width: "40%" }}>Service Name</p>
        <p style={{ width: "30%" }}>Price</p>
        <p style={{ width: "30%" }}>Action</p>
      </div>

      {/* Data Rows */}
      {services.map((service) => (
        <div key={service.id} style={{ display: "flex", flexDirection: "row", textAlign: "center", alignItems: "center", marginBottom: "10px" }}>
          <p style={{ width: "40%" }}>{service.ServiceName}</p>
          <p style={{ width: "30%" }}>{service.price.toLocaleString("vi-VN")} VND</p>
          <div style={{ width: "30%", display: "flex", justifyContent: "space-around", fontSize: 20, color: "red" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(service.id)}
            >
              <AiFillDelete /> delete
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(service.id)}
            >
              <AiFillEdit /> update
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
