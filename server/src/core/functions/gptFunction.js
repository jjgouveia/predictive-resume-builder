require('dotenv').config();
const { OpenAIApi, Configuration } = require("openai");

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
module.export = GPTFunction;