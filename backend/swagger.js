const fs = require('fs');
const yaml = require('yaml');
const swaggerUi = require('swagger-ui-express');

/**
 * Configuration Swagger (lecture depuis swagger.yml)
 */
function setupSwagger(app) {
  try {
    // Lecture du fichier YAML
    const file = fs.readFileSync('./swagger.yml', 'utf8');
    const swaggerDocument = yaml.parse(file);

    // Route Swagger UI
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        customSiteTitle: 'Lou Pankion - API E-Commerce',
      })
    );

    console.log('✅ Swagger UI disponible sur /api-docs');
  } catch (error) {
    console.error('❌ Erreur lors du chargement de Swagger:', error.message);
  }
}

module.exports = setupSwagger;
