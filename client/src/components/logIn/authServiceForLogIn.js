import axiosInstance from '../../services/api'; // חזרה שני שלבים אחורה

export const registerUser = async (fullName, email, username, password) => {
  try {
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
    const response = await axiosInstance.post('/user/login', {
      email,
      password
    });

    console.log('Login response:', response); // הדפסת התגובה מהשרת


    // const data = await response.text();
    if (!response || !response.data) {
      throw new Error('No response data received');
    }
    const data = response.data;

    if (response.status === 201 || response.status === 200) {
      return { success: true, message: data}; // הצלחה
    } else if (response.status === 404) {
      return { success: false, message: data.message}; // לא נמצא
    } else if (response.status === 401) {
      return { success: false, message: 'Invalid credentials (401)' }; // סיסמה או אימייל לא נכונים
    }
  } catch (error) {
    if (error.response) {
      // השרת החזיר תשובה עם קוד סטטוס שאינו 2xx
      if (error.response.status === 401) {
          console.error('Invalid credentials:', error.response.data);
          return { success: false, message: error.response.data}; // לא נמצא
      } else {
          console.error('Server error:', error.response.data.message);
          console.error('Error connecting to the server:', error.response.data.message);
          return { success: false, message: error.response.data}; // לא נמצא
          // return { success: false, message: 'Error connecting to the server: ' + error.response.data.message }; // שגיאה בהתחברות
        }};
    }
}
