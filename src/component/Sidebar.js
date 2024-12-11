import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
function Sidebar() {
  const navigate = useNavigate(); 

  const sidebarStyles = {
    width: '250px',
    backgroundColor: '#f4f4f4',
    height: '100vh',
    padding: '10px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  };

  const goBackButtonStyles = {
    fontSize: '50px',
    color: 'black',
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right',
    padding: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
    marginBottom: '3px', // Tạo khoảng cách dưới nút
  };

  const itemStyles = {
    textDecoration: 'none',
    color: '#555',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };
  const handleGoBack = () => {
    // Kiểm tra nếu đang ở trang login thì không cho phép quay lại
    if (window.location.pathname !== "/") {
      navigate(-1); // Quay lại trang trước nếu không phải trang login
    } else {
      // Nếu đang ở trang login, có thể điều hướng đến một trang khác như "/dashboard"
      navigate("/dashboard"); // Ví dụ chuyển hướng đến dashboard
    }
  };
  return (
    <div className="sidebar" style={sidebarStyles}>
      {/* Nút Go Back */}
      <div
        style={goBackButtonStyles}
        onClick={handleGoBack}
      >
        <AiOutlineArrowLeft />
      </div>

      {/* Các mục menu */}
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/dashboard')}
      >
        Dashboard
      </div>
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/appointment-repair')}
      >
        Appointment Repair
      </div>
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/devices')}
      >
        Devices
      </div>
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/services')}
      >
        Services
      </div>
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/users')}
      >
        Users
      </div>
      <div
        style={itemStyles}
        onClick={() => handleNavigation('/vehicles')}
      >
        Vehicles
      </div>
    </div>
  );
}

export default Sidebar;
