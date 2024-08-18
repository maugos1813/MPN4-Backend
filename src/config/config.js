// Configuracion y manejo de variables de entorno

import { config } from 'dotenv'

config() // Carga las variables de entorno desde un archivo '.env' en el objeto 'process.env'

// process.env... Busca en las variables de entorno una clave llamada 'DB_...' (Como en la ejecucion de abajo)

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_DATABASE = process.env.DB_DATABASE || 'facebook'
export const DB_PORT = process.env.DB_PORT || 3306
export const PORT = process.env.PORT || 3000
export const SECRET_KEY = process.env.SECRET_KEY // Clave secreta que se utiliza normalmente para la autenticacion como firmar tokens JWT.
