import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./../firebase";

function EditService() {
  const { id } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const docRef = doc(db, "SERVICES", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setServiceName(data.ServiceName);
          setPrice(data.price);
        } else {
          alert("No such service found!");
          navigate("/services");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchService();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!serviceName || !price) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const docRef = doc(db, "SERVICES", id);
      await updateDoc(docRef, {
        ServiceName: serviceName,
        price: parseInt(price),
      });
      alert("Service updated successfully!");
      navigate("/services");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating service!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Service</h2>
      <div>
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
        />
        <button onClick={handleUpdate} style={{ padding: "10px", width: "100%" }}>
          Update Service
        </button>
      </div>
    </div>
  );
}

export default EditService;
