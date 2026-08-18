# Project Report: ShahiDarbar

## 1. Code Walkthrough and Structure

The ShahiDarbar platform is structured as a modern full-stack web application, clearly separated into a frontend and a backend to ensure modularity and maintainability.

### Frontend (`/frontend`)
The client side is built using **React** and bundled with **Vite** for rapid development. 
- **Pages**: Top-level views (e.g., `Login.jsx`, `Register.jsx`, `Products.jsx`, `AdminProducts.jsx`) are kept in the `src/pages` directory.
- **Components**: Reusable UI elements (e.g., `Navbar.jsx`, `Hero.jsx`) are stored in `src/components`.
- **State Management**: We use React's Context API (`CartContext`, `WishlistContext`) to manage global states like the user's shopping cart and wishlist without having to pass props deeply through the component tree.
- **Styling**: Vanilla CSS (`index.css`) is used alongside utility classes for a highly customized and premium visual aesthetic.

### Backend (`/backend`)
The server side is powered by **Node.js** and **Express**, following an MVC-like architecture pattern.
- **Models**: Defines the MongoDB schemas using Mongoose (e.g., Users, Products, Orders).
- **Routes & Controllers**: API endpoints are logically grouped in the `routes/` folder (e.g., `authRoutes.js`, `productRoutes.js`, `uploadRoutes.js`, `paymentRoutes.js`). 
- **Config**: Contains database connection logic and third-party integrations (e.g., Razorpay, Cloudinary).

---

## 2. Architecture and Design Choices

- **MERN Stack**: We chose MongoDB, Express, React, and Node.js because a unified language (JavaScript) across the entire stack drastically reduces context switching and speeds up development.
- **Authentication**: **JWT (JSON Web Tokens)** was chosen for stateless, secure authentication. It allows the backend to verify users without storing session data in the database, reducing server memory load.
- **Payment Gateway**: **Razorpay** was integrated to handle seamless checkout experiences directly within the application.
- **Image Handling**: Originally designed with Cloudinary, we adapted to use **local storage via Multer** (`/uploads`) served statically by Express. This design choice reduces external API dependencies and guarantees uptime for product images.
- **Role-Based Access Control**: Added simple boolean flags (`isAdmin`) to the User schema to toggle admin-exclusive features on the frontend (like the Admin panel for managing products).

---

## 3. Use of AI Tools During Development

AI assistants were heavily utilized to accelerate the development lifecycle:
- **Code Generation & Boilerplating**: AI was used to quickly generate boilerplate code for React contexts (like the Cart logic) and complex UI layouts, saving hours of manual typing.
- **Debugging & Troubleshooting**: When obscure bugs appeared—such as `ES Module` hoisting causing environment variables to be undefined—AI was leveraged to quickly trace the root cause and refactor the import order.
- **Architecture Validation**: AI provided guidance on the best way to structure the REST API routes and handle asynchronous database operations cleanly using `try/catch` blocks.

---

## 4. Challenges Faced & Solutions

### Challenge 1: Cloudinary 403 Forbidden Errors
**The Problem**: During product creation, the image upload endpoint began throwing 500 Internal Server Errors because the Cloudinary API was returning a `403 Forbidden` response. 
**The Solution**: Rather than blocking development on external API account issues, the architecture was swiftly pivoted. We updated `uploadRoutes.js` to utilize `multer.diskStorage`, saving images directly to an `uploads/` folder on the server. We then configured `server.js` to serve this directory statically.

### Challenge 2: ES Module Hoisting Crashing Razorpay
**The Problem**: The backend repeatedly crashed with the error `` `key_id` or `oauthToken` is mandatory `` when starting up.
**The Solution**: We discovered that because `package.json` was set to `"type": "module"`, JavaScript was hoisting the `import paymentRoutes` statement before `dotenv.config()` was executed in `server.js`. This caused the Razorpay instance to initialize with empty API keys. We solved this by explicitly injecting `import dotenv from "dotenv"; dotenv.config();` at the top of the payment routes file to guarantee the keys were loaded.
