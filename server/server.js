const PORT = process.env.PORT || 3001;
const app = require('./app');

app.listen(PORT, () => {
    console.log(`Cirrus' server listening on port: ${PORT}`);
});