# 📚 ELibrary – Online Digital Library System

**ELibrary** is a complete digital library web application where users can browse, read, and download books, while admins can upload and manage PDF content. Firebase Authentication handles user login & registration. PDF storage, and image storage not working due to AWS free-tier expiry.

---

## 🎥 Project Demo

| Platform | Status | Link |
|----------|--------|------|
| **Frontend** (Vercel) | 🔥 Active | [https://elibra.vercel.app/](https://elibra.vercel.app/) |
| **Backend API** (Render) | ⚡ Stopped | [https://api-elibrary.onrender.com](https://api-elibrary.onrender.com) |
| **Admin Dashboard** | 🔐 Secure | [Admin Login](https://elibra.vercel.app/) |

---

### 🛠️ Deployment Sequence

1. **Backend (Node + Express) on Render** 

 -  Handles file upload, deletion, and book management

  - Originally used AWS S3 for PDF storage

 -  Connected to MongoDB Atlas

2. **Frontend (React + Firebase Auth) on Vercel**  

  - Add backend API URL to .env before deployment

3. **Firebase Authentication**  

  - Email/Password Login

  - Registration

  - Forgot Password


4. **Scalable Book Storage Using AWS S3 Bucket**  

  Using S3 bucket we are able to store PDFs of Books any size.

5. **MongoDB Atlas**

   Stores user info, book metadata, and admin operations

---

## 🔧 Components Overview

This app runs using three main components:

### 1. Frontend (React + Firebase Auth)
- Login/Signup
- Forgot Password
- Dark/Light Theme
- Browse Books
- Read / Download Book
- 🌐 [Repository](https://github.com/codesbyharsh/elibrary.git)
- 🌐 [Live Frontend](https://elibra.vercel.app/)

### 2. Backend (Node.js + Express + MongoDB)
- Admin login
- Upload PDF (to S3)
- Delete Book
- CRUD for books
- 🌐 [Repository](https://github.com/codesbyharsh/API-Elibrary.git)

### 3. AWS S3 Bucket (PDF Storage)
- Cloud-based storage for book files and thumbnails

- Accepts PDFs, No file-size issues, Free-tier friendly

---
## 📦 Prerequisites
```bash
- Node.js (LTS version)
- MongoDB Atlas account
- AWS Account
- Firebase project with Authentication enabled
- Vercel & Render accounts for hosting
- `.env` file configured with all credentials
```
---

## ⚙️ Tech Stack

- 🧠 **React.js** – Frontend framework
- 🎨 **Tailwind CSS** – Styling
- 🔐 **Firebase Authentication** – User management
- 🟢 **Node.js + Express** – Backend server
- 🍃 **MongoDB Atlas** – Database
- ☁️ **AWS S3 Bucket** – PDF and image storage
- 🚀 **Vercel + Render** – Hosting platforms

---

## 🛠️ Frontend Setup (Local)

### 1. Clone the Repository
```bash
git clone https://github.com/codesbyharsh/elibrary.git
cd elibrary-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
npm i
```

### 3. Configure Environment Variables
Create a .env file in the root directory with:
```bash
Create a .env file in the root directory of the project.

Add the required environment variables inside it.

Sample .env file is provided in the code.
```

### 4. Run the App
```bash
npm run dev
```
Application will run on: http://localhost:5173 

---
# Implimentation #

## Client Side
### 🔐 Login Page
![Login](./src/public/login_registration.png)

### 🔐 Password Recovery 
![Login](./src/public/password_recovery.png)

### 🏠 Homepage
 **Dark Theme**
![Homepage](./src/public/home_dark_theme.png)

 **Light Theme**
![Homepage](./src/public/home_light_theme.png)


### 📤 Read Book 
![Read Book](./src/public/read_book.png)

---
## Admin Side
### 📤 Upload Book Page
![Upload Book](./src/public/upload_book.png)

### 📤 Delete Book Page
![Delete Book](./src/public/elibra_admin_delete.png)

---
## Backend Work
### 📤 AWS S3 Bucket Storage
#### Bucket
![Bucket](./src/public/S3_Storage_bucket.png)
#### Folders
![Folders](./src/public/S3_bucket_folders.png)
#### Book Files
![Book Files](./src/public/Books_Files.png)
#### Book Thumbnails
![Book Thumbnails](./src/public/Thumbnail_files.png)

### Firebase Authentic Users List
![Firebase Users List](./src/public/firebase_authentic_users_list.png)


### MongoDB Books Information
![MongoDB Books Info](./src/public/mongoDB_books_info.png)

---
## Diagrams

### Flow Chart
![Flow Chart](./src/public/Flow_chart.png)

### Sequence Diagram
![Sequence Diagram](./src/public/sequence_diagram.png)

---

### 🙌 Thanks for Checking Out ELibrary!

***ELibrary is one of my full-stack portfolio projects built to learn real-world concepts like:***

``` bash
- Scalable PDF storage

- Role-based access (Admin/User)

- Firebase Authentication

- Real backend deployment using Render

- Cloud hosting using Vercel

- MongoDB Atlas integration

- File upload handling
```
---

**If you want to collaborate, improve this project, or discuss ideas, feel free to connect!**

📧 Email: jadhavh655@gmail.com

💼 GitHub: https://github.com/codesbyharsh

🌐 [Portfolio](https://portfolio-harshal-jadhav.vercel.app/)

---
## ⭐ If you liked this project, don’t forget to star the repository!