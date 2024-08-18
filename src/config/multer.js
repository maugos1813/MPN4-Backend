// Este código implementa una función para manejar la subida de imágenes en un servidor Node.js utilizando la librería "multer"

import multer from 'multer' // Middleware de Node.js que se utiliza para manejar la subida de archivos.
import User from '../models/User.js'

// Configuración de almacenamiento:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Define la carpeta donde se guardarán los archivos subidos.
  },
  filename: function (req, file, cb) { // Define cómo se nombrarán los archivos subidos.
    const newName = Date.now() + '-' + file.originalname
    cb(null, newName)
  }
})

// Función asíncrona que verifica ciertos requisitos antes de aceptar la subida de un archivo.
const imageFilter = async function (req, file, cb) {
  const { mimetype } = file // Atributo del archivo.
  const { username, email } = req.body // Se extraen del cuerpo de la solicitud.

  const usuarioUsername = await User.where('username', username) // Busca en la base de datos si existe el nombre de usuario.
  const usuarioEmail = await User.where('email', email) // Busca en la base de datos si existe el email.

  if (usuarioUsername.length > 0 || usuarioEmail.length > 0) { // Si existe un usuario o correo, esto impide que se suba el archivo.
    return cb(new Error('El usuario o el correo ya está en uso'))
  }

  if (mimetype.includes('image')) { // Si "mimetype" incluye la palabra "image", acepta el archivo.
    cb(null, true)
  } else {
    cb(new Error('Solo se aceptan imágenes')) // Si no lo incluye, devuelve un error.
  }
}

export const uploadImage = multer({ storage, fileFilter: imageFilter }) // Middleware configurado que se exporta para ser utilizado en rutas, Utiliza el almacenamiento "storage" y el filtro de archivos("imageFilter").
