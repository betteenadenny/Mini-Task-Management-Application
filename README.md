# 📝 Mini Task Management App

A cross-platform **Task Management Application** built for both **Web** and **Mobile** users.  
The project includes:
- 🌐 Web Frontend — built with **React + Tailwind CSS**
- 📱 Mobile App — built with **Flutter**
- ⚙️ Backend — built with **Node.js + Express**
- 🗄️ Database — **MongoDB**

---

## 🚀 Features

- User authentication (JWT)
- Create, update, delete, and search tasks(for web)
- Task filtering and sorting for web
- Responsive web interface
- Flutter mobile UI for Android, iOS, and Web

---
## 🏗️ Project Structure

mini-task-management-app/
  - backend/ # Node.js + Express API
  - frontend/ # React + Tailwind frontend
  - mobile/ # Flutter mobile application

---

## 🧩 Project Setup

### 1️⃣ Clone the repository
### 2️⃣ Navigate into the project folder
  
## ⚙️ Backend Setup (Node.js + Express)

### 1️⃣ Navigate to the backend folder
### 2️⃣ Install dependencies
```bash
   npm install
```
### 3️⃣ Create a .env file inside the backend directory

```Sample .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key
```

4️⃣ Run the backend server
```bash
npm run dev
```

The API will run at:
👉 http://localhost:5000

---

## ⚙️ Frontend Setup (React + TailwindCSS)

### 1️⃣ Navigate to the frontend folder

2️⃣ Install dependencies
```bash
  npm install
```

3️⃣ Create a .env file inside the frontend folder
 ```Sample .env file
  REACT_APP_API_URL=http://localhost:5000/api

4️⃣ Run the web app
```bash
  npm start
```
 React frontend will run at:
👉 http://localhost:3000

---

## ⚙️ Flutter App Setup 

### 1️⃣ Navigate to the mobile folder
