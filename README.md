# **QueenB X AppsFlyer - BeSafe Hackathon 2025**

**Team Members:**  
- Aviv Natan
- Orel Reissman
- Romi Goodman
- Rom Shemer  
- Sara Benita  
  
This project was created as part of the BeSafe Hackathon 2025, organized by QueenB in collaboration with AppsFlyer. The original template was adapted and extended to develop our own application focused on promoting online safety. Our project demonstrates full-stack development with a Node.js server, an Express backend, a React frontend powered by Vite, and MongoDB for database management.

> **Note:** This project is still in progress and will be presented at the hackathon event next week.

---

## **Introduction**

Our web application provides users with a simple interface to paste text for analysis. The core feature of our app is a **content analyzer** that evaluates the provided text and returns feedback indicating whether the content is negative (e.g., violent or inappropriate) or normal. In addition, the app includes a **login and registration system** to allow users to save and view their message history.

---

## **Progress Overview**
1. **Frontend Development:**
   - Designed an intuitive user interface where users can:
     - Register or log in to their account.
     - Paste text for analysis on the main page.
     - View their history of analyzed messages.
   - Integrated a feedback mechanism to display analysis results in real-time.

2. **Backend Development:**
   - Developed a secure login and registration system with hashed passwords.
   - Created an analyzer engine to classify text as negative or normal.
   - Set up API endpoints to process text inputs, return analysis results, and retrieve user message history.
   - Utilized **MongoDB** for managing and storing user data, including credentials and message logs.

3. **Hackathon Goal:**
   - Deliver a working prototype that highlights the app’s ability to enhance online safety through secure user interactions and advanced content analysis.

---

## **How to Use**

### Prerequisites
- Install [Node.js](https://nodejs.org/en) (v20.x or higher recommended).

### Clone the Repository
1. Clone the repository from GitHub.

### Server Setup
1. Navigate to the server directory: `cd server`
2. Install server dependencies: `npm install`
3. Start the server: `npm run dev`

### Client Setup
1. Navigate to the client directory: `cd client`
2. Install client dependencies: `npm install`
3. Start the client: `npm run dev`

### Test the Application
- Navigate to the client URL (default: `http://localhost:3000`).
- **Register or Log In:**
  - Register for a new account or log in if already registered.
- **Analyze Text:**
  - On the main page, paste your text into the input box and submit it.
  - View real-time feedback indicating whether the content is negative or normal.
- **View History:**
  - Access the history page to view previously analyzed messages tied to your account.

---

## **Features**
- **Login and Registration:**
  - Secure account creation with hashed passwords.
  - Log in to access personalized features, including message history.
- **Content Analysis:**
  - Classifies user-submitted text as negative (e.g., violent or inappropriate) or normal.
  - Provides real-time feedback to users.
- **Message History:**
  - Users can view a log of all their previously analyzed messages.
- **Frontend:**
  - Simple and intuitive UI for registering, logging in, pasting text, and viewing history.
  - Responsive design for seamless usage across devices.
- **Backend:**
  - Secure login and registration endpoints.
  - Custom API endpoints for text analysis and message history retrieval.
  - Middleware for enhanced security and data validation.
- **Database:**
  - **MongoDB** for storing user credentials, message history, and analysis logs.

---

## **Project Showcase**
- The project will be demonstrated at the hackathon event next week.
- The key features, including login, text analysis, and message history, will be showcased during the presentation.

---

## **Project Structure**

### Client Directory (`client/`)
Contains the React (Vite) frontend application:
- `components/`: Interactive UI components for login, text analysis, and history display.
- `context/`: Manages state and API interactions.
- `pages/`: Different application routes, including login, main page, and history.
- `services/`: Handles API calls and logic.

### Server Directory (`server/`)
Contains the Node.js / Express backend application:
- `routes/`: Defines API endpoints for authentication, text analysis, and history retrieval.
- `controllers/`: Logic for handling requests and responses.
- `models/`: MongoDB schema for users and messages.
- `db/`: MongoDB connection setup.

---

## **Acknowledgments**
We thank QueenB and AppsFlyer for organizing this hackathon and providing the project template.
