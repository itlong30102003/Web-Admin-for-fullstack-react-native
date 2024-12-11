import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { AiTwotoneCamera } from "react-icons/ai"; // Import AiTwotoneCamera

function EditUser() {
  const [formData, setFormData] = useState({
    address: "",
    avatar: "",
    birthday: "",
    email: "",
    fullName: "",
    gender: "",
    lever: "",
    phone: "",
    role: "user", // Default value
    uid: "", // UID will be fetched from Firestore
  });
  const { id } = useParams(); // Get the user ID from URL parameters
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "USERS", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data()); // Set the form data from Firestore
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };
    fetchUser();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle avatar change (file input)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "USERS", id);
      await updateDoc(docRef, formData); // Update the document in Firestore
      alert("User updated successfully!");
      navigate("/users"); // Navigate back to the user list page
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating user: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit User</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* Avatar Section */}
        <div style={{ position: "relative" }}>
            <label
                htmlFor="avatar"
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
                id="avatar"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                />
            </label>
            {formData.avatar && (
                <img
                src={formData.avatar}
                alt="Avatar Preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
            )}
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="lever"
          placeholder="Lever"
          value={formData.lever}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
