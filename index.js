import express from "express";
import mysql from "mysql2/promise";
import * as fs from "fs";

import { checkTimelineTable, checkUserTable } from "./db.js";

// Create an instance of the Express application
const app = express();

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "assignment5",
});

// Serve static files (such as CSS, JavaScript, images) from the specified directory
app.use(express.static("./public"));

// Define a route handler for the root URL ("/")
app.get("/", (req, res) => {
  // Read the content of the HTML file located at "./app/html/index.html" synchronously and store it in the 'page' variable
  const page = fs.readFileSync("./app/html/index.html", "utf-8");

  // Send the content of the 'index.html' file as the response to the client
  res.send(page);
});

// Define a route handler for the "/news" URL
app.get("/news", (req, res) => {
  // Read the content of the HTML file located at "./app/html/news.html" synchronously and store it in the 'page' variable
  const page = fs.readFileSync("./app/html/news.html", "utf-8");

  // Send the content of the 'news.html' file as the response to the client
  res.send(page);
});

// Define a route handler for the "/chapter-information" URL
app.get("/chapter-information", (req, res) => {
  // Read the content of the HTML file located at "./app/html/chapter-information.html" synchronously and store it in the 'page' variable
  const page = fs.readFileSync("./app/html/chapter-information.html", "utf-8");

  // Send the content of the 'chapter-information.html' file as the response to the client
  res.send(page);
});

// Define the port number on which the server will listen for incoming requests
const port = 8000;

// Start the Express server and make it listen on the specified port
app.listen(port, async () => {
  await checkUserTable(connection);
  // await checkUserTable();
  await checkTimelineTable(connection);

  // Log a message indicating that the server is running and listening on the specified port
  console.log(`Server is running on port ${port}`);
});
