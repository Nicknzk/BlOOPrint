import express from 'express';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp({
  apiKey: "AIzaSyD8EJWxJdxidolw55PHuF6EY7YDyOmz2Fs",
  authDomain: "auth-development-f1c64.firebaseapp.com",
  projectId: "auth-development-f1c64",
  storageBucket: "auth-development-f1c64.appspot.com",
  messagingSenderId: "347200366632",
  appId: "1:347200366632:web:ad72d364f5e3cccd14ad1d",
  measurementId: "G-TEEVNR7619",
});

// Create an Express.js app
const app = express();

// Define your Express.js routes
// Example: app.get('/api/data', (req, res) => { ... });

// Start the Express.js server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
