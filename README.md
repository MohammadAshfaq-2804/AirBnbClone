
# 🏠 Airbnb Clone

A full-stack Airbnb-inspired web application where users can explore property listings, create and manage listings, add reviews, and securely authenticate their accounts.

## 🚀 Features

* 🔐 User registration and login
* 👤 User authentication and authorization
* 🏡 Create, view, edit, and delete property listings
* 📍 Location-based listing information
* 🖼️ Image upload and cloud storage
* ⭐ Add and delete reviews
* 🛡️ Listing ownership and access control
* ⚠️ Form validation and error handling
* 💬 Flash messages for user feedback
* 📱 Responsive web interface

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport-Local-Mongoose

### APIs & Services

* Mapbox Geocoding API
* Cloudinary

## 📂 Project Structure

```text
AirBnbClone/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── middleware/
├── app.js
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd AirBnbClone
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your required environment variables.

Start the application:

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

## 🔑 Environment Variables

Create a `.env` file and configure the required variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

> ⚠️ Never upload your `.env` file or expose API keys, database passwords, or other secrets publicly.

## 📸 Screenshots

Add screenshots of the application here.

### Home Page

*Add screenshot here*

### Listing Page

*Add screenshot here*

### Create Listing

*Add screenshot here*

### Review Section

*Add screenshot here*

## 🔮 Future Improvements

* Add advanced search and filtering
* Add booking functionality
* Add payment integration
* Improve responsive design
* Add user profile management
* Add wishlist functionality
* Improve listing recommendations

## 👨‍💻 Author

**Ashfaq Mohammad**

B.Tech — Artificial Intelligence & Data Science

---

⭐ If you found this project interesting, feel free to explore the repository and give it a star!
