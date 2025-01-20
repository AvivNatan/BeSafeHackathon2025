import { BrowserRouter, Routes, Route, Link } from 'react-router'
import About from './pages/AboutPage/AboutPage';
import styles from './styles/App.module.css';
import LoginPage from './components/logIn/LoginPage';
import Chat from "./pages/ChatPage/ChatPage";
import RegisterPage from './components/logIn/RegisterPage';
import { useContext } from 'react';
import { UserContext } from './context/UserContext'; 
import UserGreeting from './components/logIn/UserGreeting'; 

function App() {
  const { user, isLoggedIn, logout } = useContext(UserContext);

  return (
      <BrowserRouter>
        <div className={styles.app}>
          <header className={styles.appHeader}>
            <nav className={styles.appNav}>
              <Link to="/" className={styles.appLink}> About </Link>
              {!isLoggedIn ? (<Link to="/register" className={styles.appLink}>Register</Link>) : null}
              {!isLoggedIn ? ( <Link to="/login" className={styles.appLink}>Login</Link> ) : 
              ( <UserGreeting isLoggedIn={isLoggedIn} user={user} logout={logout} /> )}
            </nav>
          </header>
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<About/>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/chat" element={<Chat />} />           
            </Routes>
          </main>
          <footer className={styles.footer}>
            <p>&copy; Safe Chat</p>
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
