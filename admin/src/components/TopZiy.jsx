import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopZiy = () => {
  const [visitorData, setVisitorData] = useState({ totalVisitors: 0, onlineUsers: 0 });

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/visitors'); // API URL
        setVisitorData(response.data);
      } catch (error) {
        console.error('Error fetching visitor data:', error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <div>
      <h1>Online Kullanıcılar: {(visitorData.totalVisitors)+1}</h1>
      <h2>Toplam Ziyaretçi: {visitorData.onlineUsers}</h2>
    </div>
  );
};

export default TopZiy;
