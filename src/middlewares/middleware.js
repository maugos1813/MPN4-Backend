export const validateCORS = (req, res, next) => { // Si el origen de la solicitud es permitido, entonces establece los encabezados de CORS correspondientes para permitir la solicitud.
  const validOrigins = ['http://localhost:3000', 'http://localhost:5173'] // Se define un array que contiene los orígenes permitidos.
  const { origin } = req.headers // Se extrae el valor del encabezado "origin" de la solicitud.

  if (validOrigins.includes(origin)) { // Si el "origin" de la solicitud está en la lista de orígenes permitidos, se permite la solicitud.
    res.setHeader('Access-Control-Allow-Origin', origin) // ESte encabezado especifica qué origen está permitido acceder al recurso.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Especifica qué encabezados pueden ser utilizados en la solicitud.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // Indica qué métodos HTTP están permitidos.
    return next()
  }

  res.status(403).json({ message: 'Error de CORS. No estás permitido.' })
}
// Este middleware se utiliza para gestionar las solicitudes de CORS. El propósito principal de este middleware es asegurarse de que las solicitudes HTTP provienen de origenes permitidos.

export const handleError = (err, req, res, next) => { // Define un middleware para manejar errores en un aplicacion.
  if (err) {
    return res.status(500).json({ message: err.message })
  }
}
// Este middleware es una forma sencilla y efectiva de capturar y manejar errores
