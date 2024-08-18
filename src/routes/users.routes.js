import { Router } from 'express' // Se importa 'Router' que se utiliza para crear un nuevo enrutador.
import { editUser, find, index, showImage, store } from '../controllers/user.controller.js' // Se importan funciones controladoras.
import { uploadImage } from '../config/multer.js' // Middleware configurado con multer para manejar la subida de imagenes.
import { handleError } from '../middlewares/middleware.js' // Middleware para manejar errores.

const router = Router() // Instancia del enrutado utilizando "Router()"

router.get('/', index) // Ruta para manejar solicitudes con el fin de obtener la lista de todos los usuarios.
router.get('/:id', find) // Ruta para manejar las solicitudes con el fin de obtener un usuario especifico por su 'Id'
router.post('/', uploadImage.single('image'), handleError, store) // Ruta para manejar las solicitudes para crear un nuevo usuario.
router.get('/image/:nombre', showImage) // Extrae el nombre del archivo de la imagen y envia la imagen al cliente si existe.
router.patch('/:id', editUser)

export default router
