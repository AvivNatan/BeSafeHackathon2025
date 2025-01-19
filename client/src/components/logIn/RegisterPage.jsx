import { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router'
import { registerUser } from './authServiceForLogIn';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !username || !password) {
      setError('All fields are required');
      setSuccess(null);
      return;
    }

    const result = await registerUser(fullName, email, username, password);
    console.log(result);
    if (result && result.success) {
      setSuccess(result.message);
      setError(null);
      navigate('/login');
    } else {
      setError(result.message);
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      <form onSubmit={handleRegister} className="login-form">
        <div className="input-group">
          <label className="input-label">Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        {error && <div className="error-message">{typeof error === 'object' ? error.message : error}</div>}
        {success && <div className="success-message">{typeof success === 'object' ? success.message : success}</div>}
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
