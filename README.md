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

### Flutter App Demo ScreenShots

Login Page
<img width="624" height="990" alt="Login" src="https://github.com/user-attachments/assets/a326be91-2626-45d4-95f7-2796aa3a3fe8" />

Signup page
<img width="618" height="984" alt="Signup" src="https://github.com/user-attachments/assets/69db52d6-453e-49c6-8c4d-5c676d7fb45c" />

Task Listing page
<img width="624" height="990" alt="Task Listing" src="https://github.com/user-attachments/assets/629bfdf2-2da6-498f-b2ce-07b111d02e27" />

Validation checking on adding a new task
<img width="618" height="978" alt="Validation checking" src="https://github.com/user-attachments/assets/461d1928-0dc3-4846-9128-6b3bf2f647f3" />

### React project Demo ScreenShots
Login page
<img width="1919" height="966" alt="Login (2)" src="https://github.com/user-attachments/assets/196c2c14-5c93-44ea-8ef1-9f01c6ea85c7" />

Signup page
<img width="1898" height="965" alt="Screenshot 2025-11-03 213634" src="https://github.com/user-attachments/assets/21de61a6-2759-4475-924d-c950e0d4f1bd" />

Task Listing with pagination<img width="1919" height="896" alt="Screenshot 2025-11-03 213709" src="https://github.com/user-attachments/assets/8518df34-f0a8-4a63-8bee-cb65604b3845" />

<img width="1910" height="967" alt="Screenshot 2025-11-03 213727" src="https://github.com/user-attachments/assets/991c932c-6259-4f2d-9489-a72d6c5ae9a8" />

Validation checking
<img width="1918" height="1020" alt="Screenshot 2025-11-03 214002" src="https://github.com/user-attachments/assets/98991261-cb5c-463a-952a-04394f8928ab" />

Filter task
https://github.com/user-attachments/assets/e32ec2f8-0a66-4e27-943e-564e740e3c00





