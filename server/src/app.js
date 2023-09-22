require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require("crypto");
const upload = require('./core/functions/multerUtils');
const { OpenAIApi, Configuration } = require('openai');
const resumeController = require('./controllers/resume.controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


app.post("/resume/create", upload.single("headshotImage"), resumeController.createResume);

app.post("/resume/send", upload.single("resume"), async (req, res) => {
    const {
        recruiterName,
        jobTitle,
        myEmail,
        myName,
        recruiterEmail,
        companyName,
        companyDescription,
    } = req.body;

    const prompt = `Meu nome é ${applicantName || myName}. Eu quero trabalhar na/no ${companyName}, eles são ${companyDescription}
    Estou me candidatando para a vaga de ${jobTitle}. Tenho 2 anos de experiência prática. Eu já trabalhei na: ${remainderText()}
    e eu usei tecnologias como ${technologies}
    Eu quero enviar um "cold email" para ${recruiterName}, juntamento com meu currículo e escrever porque eu combino com a empresa e com a vaga.
    Você pode escrever um email em tom amigável e não oficial? Sem assunto, com no máximo 300 palavras e que diga que meu currículo está anexado ao email.`;

    const coverLetter = await GPTFunction(prompt);

    res.json({
        message: "Request successful",
        data: {
            cover_letter: coverLetter,
            recruiter_email: recruiterEmail,
            my_email: myEmail,
            applicant_name: applicantName || myName,
            resume: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
        },
    });
});



app.get("/cirrus", (req, res) => {
    res.json({
        message: "A Doodly Creation",
    });
});


module.exports = app;