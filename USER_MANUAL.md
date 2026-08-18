# Shahi Darbar - User Manual

Welcome to the **Shahi Darbar** Food Delivery Application! This document serves as your guide to operating the platform, understanding its features, and accessing administrative controls.

## Overview
Shahi Darbar is a modern, responsive web application tailored for food delivery. It handles everything from user registration and cart management to secure payments and admin order tracking.

---

## 1. How to Access the Admin Dashboard

To manage the platform, you need to log in as an administrator. 

### Creating an Admin Account
Currently, admin access is managed through the database directly. 
When a new user is created, their `isAdmin` field in the MongoDB database defaults to `false`.

**Steps to make an account an Admin:**
1. Register a new user on the `/register` page (e.g., `admin@shahidarbar.com`).
2. Open your MongoDB Atlas or local MongoDB Compass.
3. Navigate to the `users` collection.
4. Find the document for `admin@shahidarbar.com`.
5. Update the field `isAdmin` from `false` to `true`.
6. Log out and log back in on the application.

Once logged in as an Admin, you will see a yellow **Admin** button in the top navigation bar. Clicking this will take you to the secure `/admin` dashboard.

---

## 2. Admin Capabilities

### 📊 Dashboard
- View total sales and order statistics.
- See quick actions and recent orders at a glance.

### 🍔 Product Management
- Navigate to the **Products** tab in the admin sidebar.
- Click **Add Product** to create new menu items. You can set the Name, Price, Description, Category, and Upload an Image.
- **Edit/Delete**: Use the action buttons next to any product to update prices or remove unavailable items.

### 📦 Order Management
- Navigate to the **Orders** tab.
- Here you can view all customer orders, their payment status (e.g., Paid via Razorpay), and delivery details.
- **Status Updates**: Change the order status from `Pending` → `Preparing` → `Out for Delivery` → `Delivered`. This instantly updates the visual tracking timeline for the customer in their `My Orders` page.

---

## 3. Testing Payments (Razorpay Test Mode)

To test the checkout process and payment gateway without using real money, you can use **Razorpay Test Mode**:

1. **Dashboard Toggle**: Log into your Razorpay Dashboard and flip the top-right toggle from "Live Mode" to "Test Mode".
2. **Generate Test Keys**: Go to Account Settings -> API Keys and generate your Test Keys.
3. **Update Environments**: 
   - Open `backend/.env` and set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to your new test keys (they start with `rzp_test_`).
   - Open `frontend/.env` and set `VITE_RAZORPAY_KEY_ID` to your test key ID.
4. **Restart**: Restart your servers. When you checkout, a blue "Test Mode" banner will appear on the Razorpay modal. Use Razorpay's dummy test card numbers (like `4111 1111 1111 1111`) to successfully simulate payments.

---

## 3. Customer Journey (User Flow)

1. **Browsing**: Customers can browse the home page or search for specific meals using the top search bar.
2. **Cart & Wishlist**: Users can add items to their Cart or Wishlist. The Cart Sidebar provides a quick view of selected items.
3. **Checkout**: 
   - Users must be logged in to check out.
   - They will fill out their delivery address and phone number.
4. **Payment**: The app integrates with **Razorpay** for secure live transactions. Users can pay via UPI, Card, or Netbanking.
5. **My Orders**: After a successful payment, the order appears in the `/my-orders` section where the customer can track its real-time status.

---

## 4. Troubleshooting & Deployment

- **Frontend**: The React + Vite frontend is deployed on Vercel. Ensure `VITE_API_URL` and `VITE_RAZORPAY_KEY_ID` are properly set in the `.env` file.
- **Backend**: The Node/Express backend runs on Render. It requires `MONGO_URI`, `JWT_SECRET`, and Razorpay API keys to function correctly.
- **Payment Issues**: If the Razorpay modal doesn't pop up, ensure the backend is running and the Razorpay Keys are valid and correctly configured in the `.env` file.

Enjoy using Shahi Darbar!
