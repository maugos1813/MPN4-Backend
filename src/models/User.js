import { pool } from '../config/db.js' // Permite que múltiples consultas se ejecuten.
import { hash } from 'bcrypt' // Se utiliza para hacer HASH(encriptar) las contraseñas antes de almacenarlas.

class User { // Es un modelo que proporciona modelos estáticos para interactuar con la tabla "users".
  static async all () { // Este método obtiene todos los regitros de la tabla.
    const usuarios = await pool.execute('SELECT * FROM users') // "pool.execute()" ejecuta la consulta SQL que va dentro de los paréntesis.
    return usuarios[0] // Retona el resultado de la consulta que es una lista de usuarios.
  }

  static async getById (id) { // Esta método obtiene un usuario específico de la table "users" basado en su "user_id"
    const usuario = await pool.execute('SELECT * FROM users WHERE user_id = ?', [id]) // Utiliza una consulta SQL con un marcador de posición "?" para prevenir inyecciones SQL.
    return usuario[0] // Retorna el primer elemento del resultado.
  }

  static async where (campo, valor) { // Este método realiza una búsqueda en la tabla "users" donde un "campo" en específico coincide con un "valor" dado.
    const usuario = await pool.execute(`SELECT * FROM users WHERE ${campo} = ?`, [valor]) // Se genera una consulta SQL asegurándose de protegerla contra inyecciones SQL mediante el uso de marcadores de posición.
    return usuario[0] // Retorna los resultados de coinciden.
  }

  static async create ({ fName, mName, lName, username, email, password }) { // Este método se encarga de crear un nuevo usuario en la tabla "users"
    const encriptado = await hash(password, 10) // Antes de guardar la contraseña se encripta utilizando "hash(bcrypt)" con un salt de 10 rondas.
    const campos = ['f_name', 'username', 'email', 'password'] // Contiene los nombres de los campos en la base de datos.
    const values = [fName, username, email, encriptado] // Contiene los nombres de los valores de los campos.

    if (mName) { // Si existe o el usuario proporciona un "mName"...
      campos.push('m_name') // Añade "n_name" al array "campos"
      values.push(mName) // Añade "mName al array "values"
    }

    if (lName) { // Si existe o el ususario proporciona un "lName"...
      campos.push('l_name') // Añade "l_name" al array "campos"
      values.push(lName) // Añade "lName" al array "values"
    }

    const camposString = campos.join(', ') // Contiene los nombres de los campos de la base de datos separados por un comas, para su uso en la consulta de datos.
    const placeholders = values.map(() => '?').join(', ') // Contiene signos de interrogacion uno por cada valor. Estos signos serán reemplazados por los valores reales en la consulta SQL.

    const nuevoUsuario = await pool.execute(`INSERT INTO users(${camposString}) VALUES (${placeholders})`, values) // Se ejecuta una consulta SQL 'INSERT INTO' para insertar los datos del nuevo usuario en la tabla "users". ('camposString' contiene los nombres de los campos), ('placeholders' contiene los valores en forma de placeholders: '?'), 'values' datos reales para los placeholders.
    return nuevoUsuario // Se retorna el resultado de la consulta de insercion, almacenado en "nuevo usuario"
  }

  static async getByUsernameOrEmail (valor) { // Este método busca un usuario en la base de datos usando "email" o "username"
    const usuario = await pool.execute('SELECT * FROM users WHERE email = ? OR username = ?', [valor, valor]) // Utiliza una consulta SQL que busca en ambos campos ("email" & "usermane") simultáneamente.
    return usuario[0] // Retorna el primer ususario que coincida con "email" o "username" proporcionado.
  }

  static async editUser (id, userData) {
    try {
      const { fName, mName, lName, username, email, password, phone, bio } = userData // Destructurar los datos de usuario.

      // Construir la consulta dinámicamente según los campos proporcionados
      const campos = []
      const valores = []

      if (fName) {
        campos.push('f_name = ?')
        valores.push(fName)
      }
      if (mName) {
        campos.push('m_name = ?')
        valores.push(mName)
      }
      if (lName) {
        campos.push('l_name = ?')
        valores.push(lName)
      }
      if (username) {
        campos.push('username = ?')
        valores.push(username)
      }
      if (email) {
        campos.push('email = ?')
        valores.push(email)
      }

      if (phone) {
        campos.push('phone = ?')
        valores.push(phone)
      }

      if (bio) {
        campos.push('bio = ?')
        valores.push(bio)
      }

      if (password) {
        // Encriptar la contraseña si se proporciona.
        const hashedPassword = await hash(password, 10)
        campos.push('password = ?')
        valores.push(hashedPassword)
      }

      if (campos.length === 0) {
        throw new Error('No se proporcionó ningún campo para actualizar')
      }

      valores.push(id) // Agregar el ID al final para la consulta SQL.

      const query = `UPDATE users SET ${campos.join(', ')} WHERE user_id = ?`
      const [resultado] = await pool.execute(query, valores)

      return resultado.affectedRows
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default User
