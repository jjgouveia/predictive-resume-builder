require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const upload = require('./core/functions/multerUtils');
const resumeController = require('./controllers/resume.controller');
const { maestro } = require("maestro-express-async-errors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


app.post("/resume/create", upload.single("headshotImage"), maestro(resumeController.createResume));
app.post("/resume/send", upload.single("resume"), maestro(resumeController.sendResume));

app.get("/stellaris", (_req, res) => {
    res.status(418).json({
        message: "ResumeAI is a Stellaris creation. Enjoy it!",
    });
});


module.exports = app;