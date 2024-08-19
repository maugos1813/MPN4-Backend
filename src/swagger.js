import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
// Información básica de la API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API de productos', version: '1.0.0' }
  },
  apis: ['./backend/src/index.js']
}
// Documentación en formato JSON
const swaggerSpec = swaggerJSDoc(options)
// Función para mostrar la documentación
export const swaggerDocs = (app) => {
  app.use('/api-docs', serve, setup(swaggerSpec))
}
export default { swaggerDocs }
