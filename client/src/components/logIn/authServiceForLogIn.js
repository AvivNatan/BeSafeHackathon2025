import axiosInstance from '../../services/api'; // חזרה שני שלבים אחורה

export const registerUser = async (fullName, email, username, password) => {
  try {
    // const response = await fetch('http://localhost:3000/user/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ fullName, email, username, password }),
    // });
    const response = await axiosInstance.post('/user/register', {
      fullName,
      email,
      username,
      password
    });

    // const data = await response.text();
    const data = response.data;
    if (response.status === 201) {
      return { success: true, message: data }; // הצלחה
    } else if (response.status === 400) {
      return { success: false, message: 'User already exists' }; // משתמש קיים
    }
  } catch (err) {
    return { success: false, message: 'Error connecting to the server: ' + err.message }; // שגיאה בהתחברות
  }
};

// LogIn function
export const loginUser = async (email, password) => {
  try {
    // const response = await fetch('http://localhost:3000/user/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    const response = await axiosInstance.post('/user/login', {
      email,
      password
    });

    // const data = await response.text();
    if (!response || !response.data) {
      throw new Error('No response data received');
    }
    const data = response.data;

    if (response.status === 201 || response.status === 200) {
      return { success: true, message: data }; // הצלחה
    } else if (response.status === 404) {
      return { success: false, message: 'User not found' }; // לא נמצא
    } else if (response.status === 401) {
      return { success: false, message: 'Invalid password' }; // סיסמא שגויה
    }
  } catch (err) {
    return { success: false, message: 'Error connecting to the server: ' + err.message }; // שגיאה בהתחברות
  }
};
