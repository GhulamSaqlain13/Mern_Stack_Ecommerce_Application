A Full Stack E-Commerce Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
The platform allows users to browse products, manage carts, place orders, and complete secure payments.

This project demonstrates full-stack development, REST API design, authentication, payment integration, and scalable architecture.


🚀 Features
👤 User Features

User Registration & Login

JWT Authentication

Secure Cookie Sessions

Browse Products

Product Details Page

Add to Cart

Update Cart Quantity

Remove from Cart

Secure Checkout

Order History

🛠️ Admin Features

Admin Dashboard

Add Products

Update Products

Delete Products

Manage Orders

Manage Users

💳 Payment Integration

Stripe Payment Gateway

Secure Checkout Sessions

Payment Webhooks

Order Confirmation

🧠 System Architecture
Frontend (React)
       │
       │ REST API
       ▼
Backend (Node.js + Express)
       │
       ▼
Database (MongoDB)
       │
       ▼
Stripe Payment API
🧑‍💻 Tech Stack
Frontend

React.js

Redux Toolkit

React Router

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

Authentication

JSON Web Token (JWT)

Cookies

Payment

Stripe API

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_URL=http://localhost:5173

Run backend:
npm run server
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
📡 API Documentation
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
Products
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
Cart
POST   /api/cart/add
GET    /api/cart
DELETE /api/cart/:id
Orders
POST /api/orders
GET  /api/orders


🔐 Environment Variables
PORT=
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLIENT_URL=

👨‍💻 Author
Ghulam Saqlain
MERN Stack Developer

GitHub
https://github.com/GhulamSaqlain13

⭐ Support
If you like this project:
 ⭐ Star the repository
 🍴 Fork the project
 📢 Share it with others

