# Adote um Vira Lata

Welcome to the Adote um Vira Lata Site!   
This is a web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to browse and adopt pets.  
The site was created for an NGO dedicated to pet adoption, aiming to connect animals in need of homes with loving families.

## Preview

<img src="https://github.com/belleb23/adote-mern/assets/115180927/3a80872d-3481-4b06-beda-263f6907ba82" alt="Gif App" />

## Features

- Browse available pets
- View detailed information about each pet
- Filter pets by type, breed, age, etc.
- User authentication and authorization
- Admin panel for managing pets and users
- Responsive design for mobile and desktop

## User Types

There are three types of users on this platform:

1. **Admin**:  
   - Manage all aspects of the site including adding, updating, and deleting pet listings.
   - Oversee user accounts and handle administrative tasks.
   
2. **Normal User**:  
   - Browse and search for pets available for adoption.
   - Register and log in to view detailed information about pets and start the adoption process.
   
3. **Volunteer**:  
   - Assist in managing pet listings and user inquiries.
   - Help with the day-to-day operations of the site under the supervision of an admin.


## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Ant Design
- JWT for authentication
- RESTful API architecture

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js and npm installed on your local machine
- MongoDB installed and running locally or accessible via a cloud service like MongoDB Atlas

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/belleb23/adote-mern.git

2. Navigate to the project directory
   ```sh
   cd adote-mern

3. Install server dependencies
   ```sh
   cd server
   npm install

4. Install client dependencies
   ```sh
   cd ../client
   npm install

### Configuration
1. Create a `.env` file in the server directory
   ```sh
   touch server/.env

2. Add your MongoDB connection URI and JWT secret to the .env file
   ```sh
   MONGODB_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret

### Usage

1. Start the server
   ```sh
   cd server
   npm start

2. Start the client
   ```sh
   cd client
   npm start

3. Open your browser and visit `http://localhost:3000`
