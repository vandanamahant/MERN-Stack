# MERN Stack Item Manager with Cloudinary Uploads

Hey there! 👋 This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for managing items with full CRUD functionality and image uploads.

## Features

* **API Hydration & Data Fetching**: Replaced dummy APIs with local Node.js endpoints and fetches data dynamically using `useEffect`.
* **State & Form Integration**: Fully functional React forms that dispatch `POST` requests to save documents into MongoDB, along with `DELETE` capabilities to update the UI instantly.
* **Asset Uploads & Cloud Storage**: Supports thumbnail image uploads using `FormData`, parsed via `multer` and streamed directly to a cloud CDN (`Cloudinary`).
* **Loading & Error Handling**: Built-in loading states and error boundaries for smooth user experience.

---

## Tech Stack

* **Frontend**: React.js, Vite, CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB & Mongoose
* **File Management**: Multer & Cloudinary

---

## How to Run Locally

Follow these steps to run the project on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/vandanamahant/MERN-Stack
cd project-11-mearn-project