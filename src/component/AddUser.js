import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function AddUser() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "technician", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tạo tài khoản trên Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const { user } = userCredential;

      // Thêm thông tin vào Firestore với các trường mặc định
      const newUser = {
        email: formData.email,
        fullName: formData.fullName,
        role: formData.role,
        address: null,
        avatar: null,
        birthday: null,
        gender: null,
        lever: null,
        phone: null,
        uid: user.uid, // Lưu UID từ Firebase Authentication
      };

      await addDoc(collection(db, "USERS"), newUser);
      navigate("/users");
      alert("User added successfully!");
      
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Error adding user: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New User</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
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
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
