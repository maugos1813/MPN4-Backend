-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-08-2024 a las 07:33:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facebook`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `f_name` varchar(150) NOT NULL,
  `m_name` varchar(150) DEFAULT NULL,
  `l_name` varchar(150) DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `bio` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `f_name`, `m_name`, `l_name`, `username`, `email`, `password`, `image`, `phone`, `bio`) VALUES
(1, 'mauro', 'Fabian', NULL, 'maugos', 'maugos@gmail.com', '$2b$10$xznRo7jcmc18RWnvDwLDt.WhdVzHjbAgcT8sXfiT9yII6NnsGw40O', NULL, NULL, NULL),
(2, 'fabian', NULL, NULL, 'fabiagos', 'fabiagos@gmail.com', '$2b$10$jPWjoWzRwFcqaUvxVlLSyOj1cNLLbzyRJk8l69jGr3rXK2NNPemyS', NULL, NULL, NULL),
(3, 'jairo', NULL, NULL, 'jairagos', 'jairagos@gmail.com', '$2b$10$F5d7tdCCk7B1wBI8xqf8IuQRe3znn9Ps4HpbivMBtPkECUph9HvsO', NULL, NULL, NULL),
(4, 'Mauro Agostinelli', NULL, NULL, 'agosti', 'agosti@gmail.com', '$2b$10$UqHFwG7JSorZ9AjlKb/WtO5sNLMdKzjOX9pn5CGhQE7iBGxYWseqK', NULL, NULL, NULL),
(5, 'Mauro', 'Fabian', 'Agostinelli', 'mauro', 'mauro.agostinelli@gmail.com', '$2b$10$eRozj94vNeIAGB0xtsnhC.LBqRR.HQ3EPStKJygv2MYS9i7.gb4Wa', NULL, '987654321', 'Hola, esta es una prueba. Necesito mejorar en muchas cosas, pero almenos lo estoy intentando.\nEs loco todo, a menudo es demasiada información, mi cabeza vuela, gracias por leer hasta aquí.'),
(6, 'mauro', NULL, NULL, 'mauro123', 'mauro123@gmail.com', '$2b$10$JJpQEi6DF8XXiPFdT9iHOOufQPiWNT8ULK2Qyvd5A83cXQMob.dty', NULL, NULL, NULL),
(7, 'jimena', NULL, NULL, 'jiji', 'jiji@gmail.com', '$2b$10$tsFQTR5QGApienkxlquxFOG/L3yhIMS7bjYzIHrF6/PBahtbrk8j6', NULL, NULL, NULL),
(8, '', NULL, NULL, '', 'mau@gmail.com', '$2b$10$DlXNkNVrjcjq55HA69lLG.2qtZgto7avD3sTH/ivR6ycJq8J146gu', NULL, NULL, NULL),
(9, 'Jimena', NULL, NULL, 'Jimena', 'Jimena@gmail.com', '$2b$10$r1wIkoNnz2mYKwn6cy4z9OCldpaqzLtZkyASXsgLz50q09aWr4cxC', NULL, NULL, NULL),
(10, 'fabian', NULL, NULL, 'fabian', 'fabian@gmail.com', '$2b$10$1.MO4cHg3c0fRVGEcUZv1ewGrqUVbiBUH7aY9PVaJQwtICwWdMvZq', NULL, NULL, NULL),
(12, 'fabiano', NULL, NULL, 'fabiano', 'fabiano@gmail.com', '$2b$10$iuiQ7LVYo3ZKiqKyxEzQoeSCGLThrTIXnU0dRcNhOZ3aHKs65nn/y', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
