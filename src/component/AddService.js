import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../firebase";
import { useNavigate } from "react-router-dom";

function AddService() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!serviceName || !price) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await addDoc(collection(db, "SERVICES"), {
        ServiceName: serviceName,
        price: parseInt(price),
      });
      alert("Service added successfully!");
      navigate("/services");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding service!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Service</h2>
      <div>
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "90%" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "90%" }}
        />
        <button onClick={handleAdd} style={{ padding: "10px", width: "90%" }}>
          Add Service
        </button>
      </div>
    </div>
  );
}

export default AddService;
