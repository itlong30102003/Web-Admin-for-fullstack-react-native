import React, { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./../firebase";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "USERS"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "USERS", id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleAddUser = async () => {
    navigate("/add-user");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
        <h2>Users</h2>
        <p style={{ fontSize: 25, cursor: "pointer" }} onClick={handleAddUser}>
          <AiOutlinePlus />
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: "row", textAlign: "center" }}>
        <p style={{ width: "20%" }}>Email</p>
        <p style={{ width: "20%" }}>Full Name</p>
        <p style={{ width: "20%" }}>Phone</p>
        <p style={{ width: "20%" }}>Role</p>
        <p style={{ width: "20%" }}>Action</p>
      </div>

      {users.map((user) => (
        <div key={user.id} style={{ display: 'flex', flexDirection: "row", textAlign: "center" }}>
          <p style={{ width: "20%" }}>{user.email}</p>
          <p style={{ width: "20%" }}>{user.fullName}</p>
          <p style={{ width: "20%" }}>{user.phone}</p>
          <p style={{ width: "20%" }}>{user.role}</p>
          <p style={{ width: "20%", display: "flex", justifyContent: "space-around", fontSize: 20, color: "red" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(user.id)}
            >
              <AiFillDelete /> delete
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(user.id)}
            >
              <AiFillEdit /> update
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Users;
