require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const { Configuration, OpenAIApi } = require("openai");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const generateID = () => Math.random().toString(36).substring(2, 10);

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
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

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;

    const workArray = JSON.parse(workHistory);

    const newEntry = {
        id: generateID(),
        fullName,
        image_url: `http://localhost:3001/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
    };

    const remainderText = () => {
        let stringText = "";
        for (let i = 0; i < workArray.length; i++) {
            stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
        }
        return stringText;
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
        recruiterEmail,
        companyName,
        companyDescription,
    } = req.body;

    //👇🏻 log the contents
    console.log({
        recruiterName,
        jobTitle,
        myEmail,
        recruiterEmail,
        companyName,
        companyDescription,
        resume: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
    });
});



app.get("/cirrus", (req, res) => {
    res.json({
        message: "A Doodly Creation",
    });
});


module.exports = app;