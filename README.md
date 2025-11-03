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

