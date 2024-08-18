import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Objetivo: Esta función se utiliza como middleware en rutas protegidas para verificar que el usuario esté autenticado mediante un token JWT. Si el token es válido, el usuario se permite acceder a la ruta; de lo contrario se devuelve un error.

export const verificarToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers // Obtención del token: Aquí se extrae el token JWT del encabezado "Authorization" de la solicitud HTTP.
    const decoded = jwt.verify(authorization, SECRET_KEY) // Verificación del token: Se usa el método "verify" de la biblioteca "jsonwebtoken" para verificar la validez del token JWT. Este método decodifica el token usando "SECRET_KEY". Si la verificación es exitosa, este objeto contendrá los datos que fueron codificados en el token.
    const usuario = await User.getById(decoded.usuarioId) // Se llama al método "getById" del modelo "User" para buscar en la base de datos al usuario cuyo "user_id" coincide con el "usuarioId" decodificado.

    if (usuario.length === 0) return res.status(404).json({ message: 'El token no pertenece a ningún usuario registrado' }) // Si el usuario no se encuentra en la base de datos se responde con un mansaje de error.

    req.user = usuario[0] // Si el usuario existe, se adjunta el objeto del usuario(sin la contraseña) al objeto "req".

    next() // Si todo lo anterior salio bien, se llamada "next()" para pasar el control al siguiente middleware.
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expirado' })
    }

    res.status(500).json({ message: error.message })
  }
}
