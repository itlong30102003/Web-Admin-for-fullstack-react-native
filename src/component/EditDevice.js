import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { AiTwotoneCamera } from "react-icons/ai";

function EditDevice() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const docRef = doc(db, "DEVICES", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.Name,
            price: data.Price,
            imageUrl: data.Image,
          });
          setPreviewImage(data.Image);
        } else {
          alert("No such device found!");
          navigate("/devices");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchDevice();
  }, [id, navigate]);

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

  const handleUpdate = async () => {
    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const docRef = doc(db, "DEVICES", id);
      await updateDoc(docRef, {
        Name: formData.name,
        Price: parseInt(formData.price, 10),
        Image: formData.imageUrl,
      });
      alert("Device updated successfully!");
      navigate("/devices");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating device!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Device</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Image Preview and Upload */}
        <div style={{ position: "relative" }}>
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
        <button onClick={handleUpdate} style={{ padding: "10px", width: "100%" }}>
          Update Device
        </button>
      </div>
    </div>
  );
}

export default EditDevice;