// Codigo que maneja la autenticacion de usuarios mediante un proceso de login JSON Web Tokens(JWT) para la autenticacion y BCrypt para la verificacion de contraseña.

import { SECRET_KEY } from '../config/config.js' // Se utiliza para firmar el token JWT, asegurando que el token generado no pueda ser manipulado.
import User from '../models/User.js'
import jwt from 'jsonwebtoken' // Es un paquete que permite crear y verificar tokens JWT(autenticación basada en tokens).
import { compare } from 'bcrypt' // Bilioteca que permite hacer hash(encriptación) y comparar contraseñas.

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body // Extracción de "usernameOrEmail" y "password" del cuerpo de la solicitud(en esta parte se asume que el cliente está enviando un formulario de login).

    const usuario = await User.getByUsernameOrEmail(usernameOrEmail) // Búsqueda de usuario: Se realiza una consulta a la base de datos para encontrar el usuario por "nombre de usuario" o "email"
    if (usuario.length === 0) return res.status(404).json({ message: 'El usuario no existe' }) // Si no se encuentra ningun usuario se retorna un error "404"

    const esValido = await compare(password, usuario[0].password) // Verificación de contraseña: La contraseña que proporciona el usuario se compara con la almacenada en la base de datos usando "bcrypt"
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' })

    const token = jwt.sign({ usuarioId: usuario[0].user_id }, SECRET_KEY, { expiresIn: '1h' }) // Si la contraseña es correcta, se genera un token: El token incluye "usuarioId" como payload, se firma con SECRET_KEY y se configura para que expire en 1 hora.

    delete usuario[0].password // Antes de devolver la respuesta se elimina la contraseña.
    res.json({ token, user: usuario[0] }) // Se envía el token junto con la información del usuario en formato JSON como "res(respuesta)".
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const me = async (req, res) => { // Esta función asume que la información del usuario autenticado ya está disponible en "req.user".
  delete req.user.password // Antes de enviar la información del usuario, se elimina la contraseña del objeto "req,user" para no exponerla.
  res.json(req.user) // Se envía la información del usuario autenticado(sin la contraseña).
}

// Este código forma parte del proceso de autenticación en una aplicación backend.
// La función "login" maneja el inicio de sesión, verificacndo las credenciales del usuario y devolviendo un token JWT si las credenciales son correctas.
// La función "me" se utiliza para devolver los datos del usuario actualmente autenticado.
