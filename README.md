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

### 1️⃣ Download the Zip file and extract it
### 2️⃣ Navigate into the project folder
  
## ⚙️ Backend Setup (Node.js + Express)

## 🧩 Prerequisites

Before setting up the project, make sure you have the following installed on your system:

| Tool |
|------|
| Node.js (v18 or later) |
| npm (v9 or later) |
| Express |
| MongoDB  |
| Visual Studio Code (or any preferred IDE) |

### 1️⃣ Navigate to the backend folder
### 2️⃣ Install dependencies
```
   npm install
```
### 3️⃣ Create a .env file inside the backend directory

```
#Sample .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key
```

4️⃣ Run the backend server
```
npm run dev
```

The API will run at:
👉 http://localhost:5000

---

## ⚙️ Frontend Setup (React + TailwindCSS)

## 🧩 Prerequisites

Before setting up the project, make sure you have the following installed on your system:

| Tool |
|------|
| Node.js (v18 or later) |
| npm (v9 or later) |
| Express |
| React (via Create React App) |
| MongoDB  |
| Visual Studio Code (or any preferred IDE) |


### 1️⃣ Navigate to the frontend folder

2️⃣ Install dependencies
```
  npm install
```

3️⃣ Run the web app
```
  npm start
```
 React frontend will run at:
👉 http://localhost:3000

---

## ⚙️ Flutter App Setup 

### 🧩 Prerequisites

Before running the Flutter app, make sure you have the following installed:

| Tool |
|------|
| Flutter SDK 
| Dart SDK |
|  VS Code |
| Android SDK & Emulator |
| Node.js + npm |


### 1️⃣ Navigate to the mobile folde
### 2️⃣ Get all dependencies
```
  flutter pub get
```
3️⃣ Configure API base URL

Open the configuration file ( lib/config.dart) and set the backend URL:

For web
```
 const String baseUrl = "http://localhost:5000/api";
```
For Android Emulator
```
const String baseUrl = "http://10.0.2.2:5000/api"; // Android Emulator
```

4️⃣ Run the Flutter app

```# For Web
flutter run -d chrome      
```

```For Android Emulator
flutter run -d emulator-5554
```

### Flutter App Demo 

https://github.com/user-attachments/assets/8cf61c4f-ab00-44c9-8e7f-1737ae36bb22

### React project Demo 

https://github.com/user-attachments/assets/d9165371-cef8-4f16-b1b8-fd6eb263d225

Filtering task and pagination 

https://github.com/user-attachments/assets/973b05e9-3d71-4305-be69-afd0b3a3d5bf









