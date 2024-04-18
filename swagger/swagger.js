const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'LearnVerse',
        version: '1.0.0',
        description: 'API documentation for LearnVerse',
      },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;