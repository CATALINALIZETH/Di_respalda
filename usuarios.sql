-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2024 a las 08:11:56
-- Versión del servidor: 10.6.15-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id_libros` int(11) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id_libros`, `autor`, `isbn`, `fecha_registro`, `titulo`, `user_id`) VALUES
(1, 'Ale Dumas', 'Mon1', '2024-07-03 00:00:00', 'Montecristo ', 9),
(5, 'Antony Exurperry', 'Prin1', '2019-06-13 00:00:00', 'El Principito', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `nombre`, `password`) VALUES
(1, '35', '3', '$2a$10$wbT/hzOAgvXCWd8Mfa43u.o.JOQq7E0M4CmbudGuXXFuAGbXMrwF2'),
(3, 'cata.com', 'cata', '$2a$10$4QtVuGSc4s4HI7VZW2rhCeBV6XBScYAA4NwcQJXkg2oPSHKwjctt6'),
(5, 'diegoA.com', 'diego A', '$2a$10$mQcBelmcrXqSr1DdI50nG.TRLQOKujRfZpzeVcIuf8wV0gIHYFjfC'),
(6, 'paco.com', 'paco', '$2a$10$CM5/JHbCHRoOZUgwqkwsNOK0n0Cg2VP1MRp/irZtvoKi4FdlHyJ/G'),
(7, 'manuel.com', 'manuel', '$2a$10$q.4MPfRKrCB.tr7EnE3lbu6GlF.5ZPRV40.jZEXpzRF3Lm2vqVlz2'),
(9, 'pablo.com', 'pablo', '$2a$10$503Hpe.nEc5a3tD1GG3vv.qcFKvWSesRtJoXNJtyGHpd.7xHtU7/2'),
(10, 'juan.com', 'juan', '$2a$10$/zmV9kvpu2j3EuhtybyT2uLndUSrte7szdz5UG.4LjkxKf7sYwPNC'),
(11, 'ana.com', 'ana', '$2a$10$p9yekjWSnDoESb6FeosF8uNA53EbOG2/DVKWjSbGznbbsB.dKkgce'),
(13, 'joel.com', 'joel', '$2a$10$CSTaTHCtQqGcBqPycGfbE./27ixQXvrJFTelFmk8C4TM0P11XaIeO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libros`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
