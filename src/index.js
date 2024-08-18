import express from 'express' // Se utiliza para crear el servidor y manejar rutas, middleware, etc.
import { PORT } from './config/config.js'
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import morgan from 'morgan' // Un middleware para registrar las solicitudes HTTP que recibe el servidor.

const app = express() // Esta instancia representa la aplicacion web y se utiliza para configurar rutas, etc.

app.use(morgan('dev')) // Se aplica el middleware 'morgan' en modo 'dev' para que se registren las solicitudes en la consola de details
app.use(express.json()) // Se utiliza para que express pueda interpretar las solicitudes entrantes a JSON.
app.use(validateCORS) // Valida si la solicitud entrante tiene un origen permitido.

app.use('/api/users', usersRoutes) // Asocia todas las rutas definidas en "userRoutes" con la ruta base "api/users"
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
