const swaggerJsDoc = require("swagger-jsdoc");
const userDocs = require("../routes/swagger-docs/user-docs");
const authDocs = require("../routes/swagger-docs/auth-docs");
const watchlistDocs = require("../routes/swagger-docs/watchlist-docs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Recommendation API",
      version: "1.0.0",
      description: "API documentation for the Movie Recommendation System",
    },

    paths: {
      ...userDocs,
      ...authDocs,
      ...watchlistDocs,
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },

        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
