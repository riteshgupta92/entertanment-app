const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API",
    version: "1.0.0",
    description: "API documentation for your application",
  },
  servers: [
    {
        url: 'https://entertanment-app.onrender.com/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Bookmark: {
        type: "object",
        properties: {
          adult: { type: "boolean", example: false },
          backdrop_path: { type: "string", example: "/path/to/backdrop.jpg" },
          genre_ids: {
            type: "array",
            items: { type: "number" },
            example: [28, 12],
          },
          id: { type: "number", example: 123 },
          original_language: { type: "string", example: "en" },
          original_title: { type: "string", example: "Original Movie Title" },
          overview: {
            type: "string",
            example: "A brief summary of the movie.",
          },
          popularity: { type: "number", example: 7.8 },
          poster_path: { type: "string", example: "/path/to/poster.jpg" },
          release_date: { type: "string", example: "2024-09-01" },
          title: { type: "string", example: "Movie Title" },
          video: { type: "boolean", example: false },
          vote_average: { type: "number", example: 8.5 },
          vote_count: { type: "number", example: 1500 },
        },
        required: ["id", "title", "original_title", "adult"],
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
