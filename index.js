import express from "express";
import fs from "fs";
import path from "path";
import { DateTime } from "luxon";
const port = 5550;
const app = express();

// Current Timestamp
const currentTimestamp = DateTime.local().toFormat("yyyy-MM-dd_HH-mm-ss");
// Content of the file
const fileContent = `Timestamp: ${currentTimestamp}`;
// Filename
const fileName = `${currentTimestamp}.txt`;
// Folder path
const folderPath = "./files";

// CREATE FILE
app.post("/createfile", (request, response) => {
  try {
    // Creating file
    fs.writeFile(`${folderPath}/${fileName}`, `${fileContent}`, (err) => {
      if (err) throw err.message;
      // console.log("Completed writing");
    });
    response.status(201).send(`File created successfully`);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET ALL FILES
app.get("/getfiles", (request, response) => {
  try {
    // Read all files in the folder
    const files = fs.readdirSync(`${folderPath}`);
    // Retrive all text files
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    // Provide the list of files
    response.json({ files: textFiles });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
