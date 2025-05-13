import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError(err.response.data.error);
      } else {
        setError('Буруу байна.');
        setAttemptsLeft(prev => {
          const newAttempts = prev - 1;
          if (newAttempts <= 0) {
            setError('Хэт олон оролдлого. Дараа дахин оролдоно уу.');
            return 0;
          }
          return newAttempts;
        });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Нэвтрэх</h2>
      {error && <div className="error-message">{error}</div>}
      {attemptsLeft < 10 && (
        <div className="attempts-warning">
          Үлдсэн оролдлого: {attemptsLeft}
        </div>
      )}
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
          <label>Нууц үг:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={attemptsLeft <= 0}>
          Нэвтрэх
        </button>
      </form>
     <p className="auth-switch">
        Бүртгэл үүсгэх бол энд дарна уу <span onClick={() => navigate('/register')}>Register</span>
      </p>
    </div>
  );
};

export default Login;