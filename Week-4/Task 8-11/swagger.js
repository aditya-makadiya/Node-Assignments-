const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Users CRUD API',
      version: '1.0.0',
      description: 'A simple Express API to manage users with CRUD operations',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./swaggerDocs.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;