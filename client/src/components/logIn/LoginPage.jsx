import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router'
import './LoginPage.css';
import { loginUser } from './authServiceForLogIn';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { login } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required');
      setSuccess(null);
      return;
    }

    const result = await loginUser(email, password);
    console.log(result);
    if (result && result.success) {
      setSuccess(result.message);
      setError(null);
      login(result.message.user, result.message.email);
      window.scrollTo(0, 0);
      document.body.style.overflow = 'auto';
      navigate('/chat');
    } else {
      setError(result ? result.message : 'Unexpected error');
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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

        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-link">
        <span>Don&apos;t have an account? <Link to="/register">Register here</Link></span>
      </div>
    </div>
  );
};

export default LoginPage;
