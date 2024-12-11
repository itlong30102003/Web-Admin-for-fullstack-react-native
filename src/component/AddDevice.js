import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../firebase";
import { useNavigate } from "react-router-dom";
import { AiTwotoneCamera } from "react-icons/ai";

function AddDevice() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await addDoc(collection(db, "DEVICES"), {
        Name: formData.name,
        Price: parseInt(formData.price, 10),
        Image: formData.imageUrl,
      });
      alert("Device added successfully!");
      navigate("/devices");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding device!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Device</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Image Preview and Upload */}
        <div style={{ position: "relative",width: "100px", height: "100px", borderRadius: "10%"}}>
          <label
            htmlFor="imageUpload"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "70px",
              left: "70px",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
            }}
          >
            <AiTwotoneCamera size={24} color="blue" />
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Device Preview"
              style={{ width: "100px", height: "100px", borderRadius: "10%" }}
            />
          )}
        </div>

        <input
          type="text"
          name="name"
          placeholder="Device Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "10px", width: "99%" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={{ padding: "10px", width: "99%" }}
        />
        <button onClick={handleAdd} style={{ padding: "10px", width: "100%" }}>
          Add Device
        </button>
      </div>
    </div>
  );
}

export default AddDevice;
