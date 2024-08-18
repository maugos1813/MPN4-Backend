import User from '../models/User.js'
import path from 'path' // Proporciona utilidades para trabajar con rutas de archivos y directorios.
import fs from 'fs/promises' // Permite interactuar con el sistema de archivos.

export const index = async (req, res) => { // Objetivo: Obtener todos los usuarios de la base de datos y devolverlos como una respuesta JSON.
  try {
    const usuarios = await User.all() // Se llama al método "all" del modelo "User", que realiza una consulta SQL para obtener todos los registros de la tabla "users"
    res.json(usuarios) // Si la consulta es exitosa, los usuarios se envían al cliente.
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const find = async (req, res) => { // Esta función busca un usuario específico en la base de datos utilizando su "id" y lo devuelve en formato JSON.
  try {
    const { id } = req.params // El "id" del usuario se obtiene de los parámetros de la URL("req.params")
    const usuario = await User.getById(id) // Buscar el usuario en la base de datos: se llama el modelo "getById()" del modelo "User" que busca en la base de datos un usuario que tenga el "user_id" que coincida con "id".

    if (usuario.length === 0) { // Verificar que usuario existe:(Si el ususario es un array vacío)
      return res.status(404).json({ message: 'Usuario no encontrado' }) // Se envía una respuesta con código(404)[No encontrado]
    }

    res.json(usuario) // Si el usuario es encontrado entonces se envía como respuesta en formato JSON.
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const store = async (req, res) => {
  try {
    const { email, password, fName = '', mName = '', lName = '', username = '' } = req.body
    // Verificar solo email y password
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' })

    const userPart = username || email.split('@')[0] // Al crear el ususario si no se brinda el username, este sera la primera palabra antes del '@' del correo
    const userPartTwo = fName || email.split('@')[0] // Al crear el ususario si no se brinda el fName, este sera la primera palabra antes del '@' del correo

    const nuevoUsuario = await User.create({
      fName: userPartTwo,
      mName,
      lName,
      username: userPart,
      email,
      password
    })

    if (nuevoUsuario[0].affectedRows === 1) return res.json({ message: 'Usuario guardado' })

    res.status(500).json({ message: 'Error al guardar el usuario' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const showImage = async (req, res) => { // Implementa un controllador en un servido Node.js para mostrar imagenes que fueron dubidas al servidos.
  try {
    const { nombre } = req.params // Extrae el parametro "nombre" de los parametros de la URL.
    const ruta = path.resolve(`./uploads/${nombre}`) // Crea una ruta absoluta hacia el archivo solicitado.
    await fs.access(ruta) // Verifica si el archivo existe y si se puede acceder a el.

    res.sendFile(ruta) // Si el archivo existe se envia el archivo al cliente usando "res.sendFile" que gestiona el envio de archivos en una respuesta HTTP
  } catch (error) {
    if (error.errno === -4058) {
      return res.status(404).json({ message: 'No se encontró la imagen' })
    }

    res.status(500).json({ message: error.message })
  }
}

export const editUser = async (req, res) => {
  try {
    const { id } = req.params // Obtener el ID del usuario desde los parámetros de la URL.
    const userData = req.body // Obtener los campos actualizables del cuerpo de la solicitud.

    const affectedRows = await User.editUser(id, userData)

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado o no actualizado' })
    }

    res.json({ message: 'Usuario actualizado exitosamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
