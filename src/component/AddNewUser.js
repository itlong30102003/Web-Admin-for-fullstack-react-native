import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../firebase";

function AddNewUser() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "USERS"), {
        email,
        fullname,
        phone,
        role,
      });
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddNewUser;
