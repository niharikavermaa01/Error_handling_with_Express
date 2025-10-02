# 🚀 Express.js & MongoDB: Advanced Error Handling Demo

-Welcome to this hands-on project that demonstrates how to effectively handle common errors in a web application built with Express.js, Mongoose, and EJS.
-This simple chat application is designed to showcase robust error-handling patterns for a real-world scenario.
-This repository is a practical guide for developers looking to move beyond default error messages and implement a clean, centralized, and predictable error-handling system.

---
## ✨ Key Concepts Demonstrated
This project specifically focuses on handling several types of errors that you'll frequently encounter:

1.  **Custom Error Class (`ExpressError.js`)**: Creating a reusable error class to standardize error objects with a custom message and status code.
2.  **Centralized Error-Handling Middleware**: Using a single `app.use()` middleware to catch all errors passed via `next()` and send a clean response to the user.
3.  **Handling Mongoose `CastError`**: Automatically catching errors when a user provides an invalid ID format (e.g., `/chats/123/edit`).
4.  **Handling "Not Found" Errors**: Explicitly checking if a database query returns `null` for a validly formatted but non-existent ID.
5.  **Handling Validation Errors**: Implementing basic server-side validation to prevent invalid data from being saved (e.g., an empty chat message).

⚙️ How to Run
1. Clone this repository:
    git clone https://github.com/niharikavermaa01/Error_handling_with_Express.git

2. Navigate to the Director: Change into the newly created project folder.
    cd YOUR_REPOSITORY_NAME

3. Install Dependencies: Install all the required npm packages.
  npm install

4. Run the Server
   node app.js
You should see a confirmation message in your terminal, like "Server is running".

5. Open in Browser
Navigate to http://localhost:8080/chats in your web browser to use the application.

Thankyou so much for your time ♥💕
