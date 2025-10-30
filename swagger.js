const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API E-Commerce - Hélio de Breyne",
            version: "1.0.0",
            description: "Documentation de l'API e-commerce développée avec Node.js, Express et MongoDB",
        },
        servers: [
            {
                url: "http://localhost:4612",
                description: "Serveur local de développement",
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
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setupSwagger;