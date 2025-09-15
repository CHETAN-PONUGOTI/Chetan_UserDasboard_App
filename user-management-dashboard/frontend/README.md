# User Management Dashboard

A full-stack web application built with React, Node.js, Express, and SQLite that allows users to perform CRUD (Create, Read, Update, Delete) operations on a user list.

## Live Demo

* **Frontend (Vercel):** [https://chetan-user-dasboard-app.vercel.app/](https://chetan-user-dasboard-app.vercel.app/)
* **Backend (Render):** [https://chetan-userdasboard-app-1.onrender.com](https://chetan-userdasboard-app-1.onrender.com)

---

## Screenshot



---

## Tech Stack

**Frontend:**
* **React.js:** A JavaScript library for building user interfaces.
* **React Router:** For client-side routing and navigation.
* **Axios:** For making HTTP requests to the backend API.
* **Tailwind CSS:** A utility-first CSS framework for styling.

**Backend:**
* **Node.js:** A JavaScript runtime for the server.
* **Express.js:** A web application framework for Node.js.
* **SQLite:** A lightweight, file-based SQL database.
* **CORS:** Middleware for enabling cross-origin requests.

---

## Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete users.
* **RESTful API:** A well-structured backend API for managing user data.
* **Responsive Design:** A clean and modern UI that works on all screen sizes.
* **Client-Side Routing:** A seamless single-page application (SPA) experience.
* **Environment Variable Configuration:** Securely manage API keys and URLs.

---

## Project Structure

The project is a monorepo containing both the frontend and backend in separate directories.

```
/
├── backend/        # Node.js & Express API
│   ├── routes/
│   ├── database.js
│   ├── server.js
│   └── package.json
└── frontend/       # React Application
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   └── pages/
    └── package.json
```

---

## API Endpoints

The backend server provides the following RESTful endpoints:

| Method | Endpoint         | Description             |
| :----- | :--------------- | :---------------------- |
| `GET`  | `/api/users`     | Get a list of all users |
| `GET`  | `/api/users/:id` | Get a single user by ID |
| `POST` | `/api/users`     | Create a new user       |
| `PUT`  | `/api/users/:id` | Update an existing user |
| `DELETE`| `/api/users/:id` | Delete a user           |

---
