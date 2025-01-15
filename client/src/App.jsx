import { BrowserRouter, Routes, Route, Link } from 'react-router'
//import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import LoginPage from './components/logIn/LoginPage';
import Chat from "./pages/ChatPage/ChatPage";

import RegisterPage from './components/logIn/RegisterPage'; // היבוא של עמוד ההרשמה
function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Register</Link>
            <Link to="/login" className={styles.appLink}>Login</Link>
            <Link to="/chat" className={styles.appLink}>Home</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* הוספת הנתיב עבור דף ההתחברות */}
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
