import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Нууц үг дор хаяж 8 оронтой байх ёстой.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Бүртгүүлэлт амжилтгүй');
    }
  };

  return (
    <div className="login-container">
      <h2>Бүртгүүлэх</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Нэвтрэх нэр:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Нууц үг(хамгийн багадаа 8 тэмдэгт):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
          />
        </div>
        <button type="submit">Бүртгүүлэх</button>
      </form>
      <p className="auth-switch">
        Хэрвээ аль хэдийн бүртгэлтэй бол <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default Register;