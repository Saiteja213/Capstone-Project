# 🍕 Pizza Store Capstone Project

A full-stack Pizza Ordering Platform where customers can browse pizzas, add items to cart, and place orders while admins manage menu items and order lifecycle.

---

# 🚀 Tech Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* REST APIs

### Database

* MySQL

### Tools

* Git
* GitHub
* Postman
* Maven

---

# 📂 Project Structure

```
Capstone-Project
│
├── backend
│   └── Spring Boot application
│
├── frontend
│   └── React application
│
└── README.md
```

---

# 👨‍💻 Features

### User Features

* User Registration & Login
* Browse Pizza Menu
* Add Pizza to Cart
* Place Orders
* View Order History

### Admin Features

* Admin Login
* Add / Update / Delete Menu Items
* Manage Orders
* Update Order Status
* Generate Bills

---

# 🔐 Authentication

The application uses **JWT (JSON Web Token)** for authentication and authorization.

* User logs in
* Server generates JWT token
* Token is used for secured API requests

---

# ⚙️ How to Run the Project

### 1️⃣ Clone Repository

```
git clone https://github.com/Saiteja213/Capstone-Project.git
```

---

### 2️⃣ Run Backend (Spring Boot)

Navigate to backend folder:

```
cd backend
```

Run the application:

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 3️⃣ Run Frontend (React)

Navigate to frontend folder:

```
cd frontend/pizza-store-ui
```

Install dependencies:

```
npm install
```

Start React app:

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📡 API Testing

APIs can be tested using **Postman**.

Example endpoints:

```
POST /api/auth/login
GET /api/menu
POST /api/orders
GET /api/orders/user
```

---

# 📸 Screenshots

Add screenshots of:

* Login Page
* Menu Page
* Cart Page
* Admin Dashboard

---

# 👤 Author

**Sai Teja**

---

# ⭐ Future Improvements

* Online Payment Integration
* Order Tracking
* Email Notifications
* Docker Deployment
# Capstone-Project