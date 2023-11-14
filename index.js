import express from "express";
import fs from "fs";
const port = 5550;
const app = express();

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
