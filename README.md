# Courses For You – Backend (Node.js / Express / MongoDB)

This repository contains the **backend API** for the “Courses For You” full-stack coursework project.  
It exposes a simple REST API for **lessons** and **orders**, backed by **MongoDB**, and is consumed by a Vue.js frontend hosted on GitHub Pages.

The backend is deployed on **Render**. 

---


- **Node.js** + **Express.js**
- **MongoDB** (cloud cluster)
- **native driver** for database access
- Hosted on **Render**
- Tested with **Postman**

---

## Features

### Lessons API

- Returns a list of lessons from MongoDB.
- Each lesson includes:
  - `topic` (subject title)
  - `location`
  - `price`
  - `space` (available spaces)
  - optional `image` / icon path
- Supports **updating available spaces** via `PUT /lessons/:id`.
- Designed to be consumed by the Vue.js frontend (lesson listing, cart, admin page).

### Orders API

- Accepts new orders from the frontend via `POST /orders`.
- Saves orders into MongoDB with:
  - customer `name`
  - `phoneNumber`
  - an array of `lessonIDs`
  - total number of spaces ordered
  - timestamp / metadata
- Used by the checkout page of the frontend.

### MongoDB Integration

- **Two collections**:
  - `lessons` – initial seed of at least 10 lessons.
  - `orders` – one document per order.
- Includes a separate **seeding script** (`add-lessons.js`) to populate the `lessons` collection.

### Middleware

- **Logger middleware** (`logger.js`)
  - Logs every incoming request (method, URL, timestamp) to the console.
  - Helps with debugging and demonstrates custom middleware usage.

- **Static file middleware**
  - Serves lesson images or returns an error message if the image does not exist.
  - Demonstrates serving static assets in Express.

- Basic error-handling and JSON parsing (`express.json()`).

### REST API Design

All API routes are mounted under `/api` (e.g. `/api/lessons`), which makes it easy for the frontend to call them via `fetch()`.

---

## Project Structure

```txt
.
├── add-lessons.js       # Script to seed MongoDB with initial lesson data
├── lesson_routes.js     # Express routes for /lessons (GET, PUT)
├── orders_routes.js     # Express routes for /orders (POST)
├── logger.js            # Custom logger middleware
├── server.js            # Express app entry point
├── test-db.js           # Utility script to test DB connectivity
├── test-orders.js       # Utility script to test order insertion
├── package.json
└── README.md
