import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToplamZiyaretci = () => {
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
    <div>onlineUsers
      <h1>Online Kullanıcılar: {visitorData.TotalVisitors}</h1>
      <h2> Toplam Ziyaretçi:{visitorData.onlineUsers}</h2>totalVisitors
    </div>
  );
};

export default ToplamZiyaretci;
