const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'ResumeAI API',
      description: 'ResumeAI Information',
      servers: ['http://localhost:3001'],
    },
    // securityDefinitions: {
    //   bearerAuth: {
    //     type: 'apiKey',
    //     name: 'Authorization',
    //     scheme: 'bearer',
    //     in: 'header',
    //   },
    // },
  },
  apis: ['./src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
