import { useState } from 'react';
import { Link } from 'react-router'

import './LoginPage.css';
import { loginUser } from './authServiceForLogIn'; // היבוא של פונקציה לשליחת בקשה לשרת

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{typeof success === 'string' ? success : JSON.stringify(success)}</div>} {/* מציגים את ההודעה אם היא אובייקט */}
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-link">
        <span>Don&apos;t have an account? <Link to="/register">Register here</Link></span>
      </div>
    </div>
  );
};

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null); 

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // כאן תוכל להוסיף את הלוגיקה שלך להתחברות

//     if (!username || !password) {
//      setError('Both username and password are required');
//      setSuccess(null);
//      return;
//     }

//     //todo: check in database
//     if (username === 'admin' && password === 'password') {
//       console.log('Login successful');
//       setSuccess('Login successful');
//       setError(null);
//     } else {
//       setError('Invalid username or password');
//       setSuccess(null);
//       return;
//     }

//     setError(null);
//     setSuccess('Login successful');
//     console.log('Login successful');
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Login</h2>
//       <form onSubmit={handleLogin} className="login-form">
//         <div className="input-group">
//           <label className="input-label">Username:</label>
//           <input 
//             type="text" 
//             value={username} 
//             onChange={(e) => setUsername(e.target.value)} 
//             className="input-field" 
//             required 
//           />
//         </div>
//         <div className="input-group">
//           <label className="input-label">Password:</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             className="input-field" 
//             required 
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         {success && <div className="success-message">{success}</div>} {/* באנר הצלחה */}
//         <button type="submit" className="login-button">Login</button>
//       </form>
//     </div>
//   );
// };

export default LoginPage;
