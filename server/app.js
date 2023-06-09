require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const crypto = require("crypto")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

let workArray = []
let applicantName = ""
let technologies = ""

// const generateID = () => Math.random().toString(36).substring(2, 10);
const generateID = crypto.randomUUID({ disableEntropyCache: true })

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
});

let database = [];



const remainderText = () => {
    let stringText = "";
    for (let i = 0; i < workArray.length; i++) {
        stringText += ` ${workArray[i].name} como ${workArray[i].position}.`;
    }
    return stringText;
};

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;

    workArray = JSON.parse(workHistory);
    applicantName = fullName;
    technologies = currentTechnologies;

    const newEntry = {
        id: generateID,
        fullName,
        image_url: `http://localhost:3001/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
    };



    const prompt1 = `Eu estou escrevendo um currículo. Minhas informações são: \n nome: ${fullName} \n cargo: ${currentPosition} por (${currentLength} ano(s)). \n Eu desenvolvo em: ${currentTechnologies}. Você pode escrever uma descrição com até 100 palavras para o topo do meu currículo (escrita em primeira pessoa)?`;
    const prompt2 = `Eu estou escrevendo um currículo. Minhas informações são: \n nome: ${fullName} \n cargo: ${currentPosition} por (${currentLength} ano(s)). \n Eu desenvolvo em: ${currentTechnologies}. Você pode escrever 10 pontos em que sou bom a partir dessas características?`;
    const prompt3 = `Eu estou escrevendo um currículo. Minhas informações são: \n nome: ${fullName} \n cargo: ${currentPosition} por (${currentLength} ano(s)). \n Trabalhei em ${workArray.length
        } empresa(s). ${remainderText()} \n Você pode escrever até 50 palavras para cada empresa de acordo com a minha função (em primeira pessoa)?`;

    const objective = await GPTFunction(prompt1);
    const keypoints = await GPTFunction(prompt2);
    const jobResponsibilities = await GPTFunction(prompt3);
    const chatgptData = { objective, keypoints, jobResponsibilities };


    const data = { ...newEntry, ...chatgptData };
    database.push(data);

    res.json({
        message: "Request successful!",
        data,
    });
});

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
    Eu quero enviar um "cold email" para ${recruiterName}, meu currículo e escrever porque eu combino com a empresa e com a vaga.
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