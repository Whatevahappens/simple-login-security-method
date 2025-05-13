import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="home-container">
      <h1>Оньсон тоглоомын системд тавтай морил</h1>
      <p>Амжилттай нэвтэрсэн байна.</p>
      <button onClick={handleLogout}>Гарах</button>
    </div>
  );
};

export default Home;