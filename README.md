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

Our web application provides users with a simple interface to paste text for analysis. The core feature of our app is a **content analyzer** that evaluates the provided text and returns feedback indicating whether the content is negative (e.g., violent or inappropriate) or normal. This functionality is aimed at promoting safer communication and fostering a positive online environment.

---

## **Progress Overview**
1. **Frontend Development:**
   - Designed an intuitive user interface where users can paste text for analysis.
   - Integrated a feedback mechanism to display analysis results in real-time.

2. **Backend Development:**
   - Developed an analyzer engine to classify text as negative or normal.
   - Set up API endpoints to process text inputs and return analysis results.
   - Utilized **MongoDB** for managing and storing text analysis logs.

3. **Hackathon Goal:**
   - Deliver a working prototype to demonstrate how the app promotes online safety by identifying potentially harmful content.

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
- Paste any text into the input box on the homepage.
- Submit the text to receive feedback on whether the content is negative or normal.

---

## **Features**
- **Content Analysis:**
  - Classifies user-submitted text as negative (e.g., violent or inappropriate) or normal.
  - Provides real-time feedback to users.
- **Frontend:**
  - Simple and intuitive UI for pasting and analyzing text.
  - Responsive design for seamless usage across devices.
- **Backend:**
  - Analyzes text using a custom logic engine.
  - Stores analysis logs securely in a **MongoDB** database.
- **Integration:**
  - Smooth interaction between frontend and backend using RESTful API endpoints.

---

## **Project Showcase**
- The project will be demonstrated at the hackathon event next week.
- The key feature (text analyzer) and its potential applications will be highlighted during the presentation.

---

## **Project Structure**

### Client Directory (`client/`)
Contains the React (Vite) frontend application:
- `components/`: Interactive UI components.
- `context/`: Manages state and API interactions.
- `pages/`: Different application routes.
- `services/`: Handles API calls and logic.

### Server Directory (`server/`)
Contains the Node.js / Express backend application:
- `routes/`: Defines API endpoints for text analysis.
- `controllers/`: Logic for processing user-submitted text.
- `models/`: MongoDB schema and data handling.
- `db/`: MongoDB connection setup.

---

## **Acknowledgments**
We thank QueenB and AppsFlyer for organizing this hackathon and providing the project template.
