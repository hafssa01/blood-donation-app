import React, { useState } from 'react';
import { FaRegFileAlt, FaHeartbeat, FaUsers, FaTint, FaGlassCheers } from 'react-icons/fa'; // Importing some icons

const BloodDonationProcess = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const iconStyles = {
    color: '#ff2c2c',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Title */}
      <h1 className="text-center">
        <span style={{ color: '#ff2c2c' }}>Blood</span> Donation Process
      </h1>
      
      {/* List of Steps */}
      <div className="row justify-content-center mt-5 mb-5">
        {[ 
          { icon: <FaHeartbeat size={60} />, text: 'Review health history' },  
          { icon: <FaRegFileAlt size={60} />, text: 'Register' },            
          { icon: <FaUsers size={60} />, text: 'Reach Donor or Recipient' },
          { icon: <FaTint size={60} />, text: 'Donate or receive blood' },
          { icon: <FaGlassCheers size={60} />, text: 'Hydrate' },
        ].map((item, index) => (
          <div
            key={index}
            className="col-md-2 text-center mb-5"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
              boxShadow: hoveredIndex === index ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div style={iconStyles}>
              {item.icon}
            </div>
            <div style={{ fontWeight: 'bold', marginTop: '10px' }}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationProcess;
