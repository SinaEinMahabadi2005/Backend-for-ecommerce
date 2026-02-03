import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce Project",
      version: "1.0.0",
      description: "E-Commerce Project API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    coponents: {
      securitySchema: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Modules/**/docs.js"],
};
export const swaggerSpace = swaggerJSDoc(options);
