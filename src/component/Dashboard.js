import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "USERS")); // Lấy toàn bộ tài liệu trong bảng `user`
        setUserCount(querySnapshot.size); // Sử dụng `size` để đếm số tài liệu
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []); // Chỉ chạy khi component được mount

  return (
    <div style={{display: 'flex',flexDirection:'row',height:200,borderBottom: '1px solid black',justifyContent: 'space-between'}}>
      <div style={{display: 'flex',flexDirection:'column',paddingLeft:10}}> 
        <p style={{fontSize:30, fontFamily: 'Times New Roman, serif',}}>Dashboard</p>
        <p style={{fontSize:30, fontFamily: 'Times New Roman, serif'}}>Welcome to the Admin Dashboard.</p>
      </div>
      <div style={{display: 'flex',flexDirection:'column',paddingRight:150}}>
      <p style={{fontSize:30, fontFamily: 'Times New Roman, serif'}}>Total Users:</p>
      <p style={{fontSize:30, fontFamily: 'Times New Roman, serif'}}> {userCount}</p>
      </div>
    </div>
  );
}

export default Dashboard;
