# 🚑 Ambulance Alert App (In Development)

The **Ambulance Alert App** is a healthcare emergency response system currently in active development. Our goal is to create a seamless communication network between patients, ambulance drivers, and hospitals — helping save lives with faster and smarter emergency response.

This project is being built as a proof of concept / MVP (Minimum Viable Product) and will continue evolving with more real-time and intelligent features.

---

## 🔧 Current Status: MVP Development

We are actively working on building out the following core functionalities:
- Secure authentication for patients, ambulances, and hospitals
- Role-based home screens and navigation
- Emergency request management
- Real-time data sync (coming soon)
- Firebase-powered backend authentication

---

## 🧩 Features Implemented (So Far)

### ✅ Role-Based Access
- **Patients / Users**
  - Register & login with email
  - Forgot password via email reset
  - Navigate to a personalized home screen
- **Ambulance Operators**
  - Role-specific registration with vehicle details
  - Dedicated screen for handling requests
- **Hospitals**
  - Register hospital with essential info
  - Access a hospital-specific view

### ✅ Authentication
- Firebase Authentication (email/password)
- Firebase Admin SDK for role control
- Persistent login support
- Secure route access per role

### ✅ Frontend (React Native + Expo)
- Modern, minimal UI with responsive design
- Role-based navigation flows
- Auth context via React Context API

### ✅ Backend (Node.js + Express)
- MongoDB to store user/role data
- REST API for user registration & retrieval
- Firebase token validation middleware

---

## ⚙️ Project Structure

```
ambulance-alert-app/
├── client/
│   └── ambulance-client/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── navigation/
│       ├── screens/
│       ├── services/
│       ├── App.js
│       └── app.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── firebase/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
└── README.md
```

---

## 🚧 In Progress / Coming Soon

These features are part of our Phase 2 development:

- [ ] 🔴 **Live GPS Tracking** for ambulances and users
- [ ] 🔔 **Push Notifications** using Firebase Cloud Messaging (FCM)
- [ ] 📡 **Nearby Alerts System** for users close to an emergency
- [ ] 📊 **Hospital Bed Availability** API & UI
- [ ] 💬 **In-app Chat** between hospital and ambulance
- [ ] 💳 **Payment Integration** for ambulance services

---

## 🚀 How to Run the Project Locally

### ⚙️ Backend Setup
1. Go to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 📱 Frontend Setup
1. Go to the frontend:
   ```bash
   cd client/ambulance-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo dev server:
   ```bash
   npm start
   ```

---

## 📦 Tech Stack

| Layer         | Technology               |
|---------------|--------------------------|
| Frontend      | React Native + Expo      |
| Backend       | Node.js + Express.js     |
| Database      | MongoDB                  |
| Auth System   | Firebase Authentication  |
| Real-Time Data| Firebase Admin SDK       |
| APIs          | Axios + RESTful Routes   |
| State Mgmt    | React Context API        |

---

## 🔮 Future Scope

- Admin panel to manage system-level access
- Voice-enabled emergency reporting
- Telemedicine integration (video consults)
- Multilingual support
- Advanced analytics dashboard for hospitals & operators
- AI-based ETA prediction for ambulances

---

## 🤝 Contributing

We are currently in a fast-moving build phase, but open to collaborations! If you're a developer, designer, or have domain expertise, feel free to fork the repo, start a new branch, and open a pull request.

---

## 📜 License

This project is currently under development and is open-sourced under the [MIT License](LICENSE).
