import { Router } from 'express' // Permite crear un nuevo enrutador que puede manejar rutas especificas de manera modular.
import { login, me } from '../controllers/auth.controller.js' // Se importan dos controladores
import { verificarToken } from '../middlewares/auth.middleware.js' // Se importa middleware

const router = Router() // Se crea una instancia  del enrutador utilizando 'Router()'

router.post('/login', login) // Ruta que maneja solicitudes de inicio de sesion.
router.get('/me', verificarToken, me) // Ruta para obtener la informacion del usuario autenticado.

export default router
