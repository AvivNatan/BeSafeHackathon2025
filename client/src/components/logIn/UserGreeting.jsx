
import { useState } from 'react';
import PropTypes from 'prop-types';  // היבוא של PropTypes
import styles from './UserGreeting.module.css'; // הוספת קובץ CSS מותאם
import { Link } from 'react-router';

const UserGreeting = ({ isLoggedIn, user, logout }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  if (isLoggedIn) {
    return (
      <>
        <Link to="/login" onClick={handleLogout} className={styles.appLink}>Logout</Link>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Are you sure you want to log out?</p>
              <button onClick={confirmLogout} className={`${styles.modalButton} ${styles.yes}`}>Yes</button>
              <button onClick={cancelLogout} className={`${styles.modalButton} ${styles.no}`}>No</button>
            </div>
          </div>
        )}
        <Link to="/chat" className={styles.appLink}>Home</Link>
        <span className={styles.username}>Hello, {user} ! </span>
        </>
    );
  } else {
    return <span className={styles.username}>Hello Guest ! </span>;
  }
};

UserGreeting.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

export default UserGreeting;