-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-07-2023 a las 23:25:30
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `employee_management_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(1, 'Marketing'),
(2, 'Sales'),
(3, 'Human Resources'),
(4, 'Research and Development'),
(5, 'Production'),
(6, 'Information Technology'),
(7, 'Finance'),
(8, 'Logistics');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `department_history`
--

CREATE TABLE `department_history` (
  `history_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `change_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `department_history`
--

INSERT INTO `department_history` (`history_id`, `employee_id`, `department_id`, `change_date`) VALUES
(1, 4, 3, '2023-07-18'),
(2, 4, 4, '2023-07-18'),
(3, 4, 5, '2023-07-19'),
(4, 4, 6, '2023-07-18'),
(5, 4, 7, '2023-07-18'),
(6, 2, 7, '2023-07-18'),
(7, 4, 3, '2023-07-19'),
(8, 2, NULL, '2023-07-19'),
(9, 4, NULL, '2023-07-19'),
(10, 4, NULL, '2023-07-19'),
(11, 4, NULL, '2023-07-19'),
(12, 4, NULL, '2023-07-19'),
(13, 6, NULL, '2023-07-19'),
(14, 4, NULL, '2023-07-19'),
(15, 4, NULL, '2023-07-19'),
(16, 4, NULL, '2023-07-19'),
(17, 4, NULL, '2023-07-19'),
(18, 4, NULL, '2023-07-19'),
(19, 4, NULL, '2023-07-19'),
(20, 4, NULL, '2023-07-19'),
(21, 4, NULL, '2023-07-19'),
(22, 4, NULL, '2023-07-19'),
(23, 4, NULL, '2023-07-19'),
(24, 4, NULL, '2023-07-19'),
(25, 4, NULL, '2023-07-19'),
(26, 4, NULL, '2023-07-19'),
(27, 4, NULL, '2023-07-19'),
(28, 4, NULL, '2023-07-19'),
(29, 4, NULL, '2023-07-19'),
(30, 3, 2, '2023-07-19'),
(31, 3, 4, '2023-07-19'),
(32, 4, 7, '2023-07-19'),
(33, 3, NULL, '2023-07-19'),
(34, 3, NULL, '2023-07-19'),
(35, 4, NULL, '2023-07-19'),
(36, 3, NULL, '2023-07-19'),
(37, 3, NULL, '2023-07-19'),
(38, 3, 5, '2023-07-19'),
(39, 3, 4, '2023-07-19'),
(40, 2, 2, '2023-07-19'),
(41, 9, 6, '2023-07-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `hire_date` date NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_active` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`employee_id`, `first_name`, `last_name`, `hire_date`, `department_id`, `phone`, `address`, `is_active`, `is_deleted`) VALUES
(1, 'Elías', 'Barreto', '2022-01-01', 2, NULL, NULL, 'Inactive', 0),
(2, 'Jessica', 'Angel', '2023-06-25', 2, '333222', 'Zulia A', 'Inactive', 0),
(3, 'Juan', 'Angel B', '2023-06-27', 4, '123456122', 'Zulia A', 'Inactive', 0),
(4, 'Jessica B', 'Baett', '2019-12-20', 7, '1234561', 'Zulia', 'Active', 0),
(5, 'Ruth', 'Baettig', '2023-07-18', 3, NULL, NULL, 'Active', 0),
(6, 'Oscar', 'Baettig', '2023-07-18', 3, NULL, NULL, 'Active', 0),
(7, 'Elizabeth', 'Baettig', '2023-07-17', 3, '', '', 'Active', 0),
(8, 'Elizabeth', 'Baettig', '2023-07-18', 3, NULL, NULL, 'Active', 0),
(9, 'Ezequiel', 'Barreto', '2023-07-17', 6, '+56 954781682', 'Imperial 0653', 'Inactive', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indices de la tabla `department_history`
--
ALTER TABLE `department_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `department_history`
--
ALTER TABLE `department_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `department_history`
--
ALTER TABLE `department_history`
  ADD CONSTRAINT `department_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `department_history_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);

--
-- Filtros para la tabla `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
