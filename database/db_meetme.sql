-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2023 at 07:42 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_meetme`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `room` varchar(25) NOT NULL,
  `name` varchar(46) NOT NULL,
  `comment` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `room`, `name`, `comment`) VALUES
(1, 'Room B', 'Milen Jordanov Petrov', 'You are a lot of people in this room?!'),
(2, 'Room B', 'Milen Jordanov Petrov', 'I see, I see.'),
(3, 'Room B', 'Hristo Kostov Hristov', 'A lot of people are doing this project.'),
(4, 'Room Duplicate!', 'Hristo Kostov Hristov', 'Yes I know the start time of this room is the same as the one before.'),
(5, 'Start in Bosch', 'Ivalina Hristova Ivanova', 'Good LUCK!'),
(6, 'Room C', 'Hristo Kostov Hristov', 'One comment for room C.');

-- --------------------------------------------------------

--
-- Table structure for table `delay`
--

CREATE TABLE `delay` (
  `roomname` varchar(25) NOT NULL,
  `delay` int(3) DEFAULT 0,
  `global_delay` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delay`
--

INSERT INTO `delay` (`roomname`, `delay`, `global_delay`) VALUES
('Algebra popravka', 0, 0),
('Algebra popravka2', 0, 0),
('room A', 0, 30),
('room B', 0, 0),
('room C', 0, 0),
('room D', 0, 0),
('Room Duplicate!', 0, 15),
('room posledniq', 0, 45),
('Start in Bosch', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `roomname` varchar(25) NOT NULL,
  `link` varchar(30) NOT NULL,
  `holder` varchar(46) NOT NULL,
  `data` varchar(18) NOT NULL,
  `duration` int(3) NOT NULL,
  `members` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`roomname`, `link`, `holder`, `data`, `duration`, `members`) VALUES
('Algebra popravka', 'https://meet.jit.si/IfR6UjNY', 'Evgeniq Dimitrova Velikova', '2023-02-02T10:30', 30, '82092'),
('Algebra popravka2', 'https://meet.jit.si/v8AKBEiG', 'Evgeniq Dimitrova Velikova', '2023-02-03T08:00', 30, '11111,22222'),
('room A', 'https://meet.jit.si/SWzS7zTe', 'Milen Jordanov Petrov', '2023-02-07T12:45', 30, '82013,66666,44444,33333'),
('room B', 'https://meet.jit.si/Ft53jmld', 'Milen Jordanov Petrov', '2023-02-07T12:30', 15, '82013,66666,11111,22222,55555'),
('room C', 'https://meet.jit.si/VTH52PYe', 'Milen Jordanov Petrov', '2023-02-07T12:15', 15, '82013,66666,82092'),
('room D', 'https://meet.jit.si/Bw8Oi1I9', 'Milen Jordanov Petrov', '2023-02-07T12:00', 15, '82013,82092'),
('Room Duplicate!', 'https://meet.jit.si/w2OiIkGP', 'Milen Jordanov Petrov', '2023-02-07T12:30', 30, '82013'),
('room posledniq', 'https://meet.jit.si/TEFvDUhz', 'Milen Jordanov Petrov', '2023-02-07T13:00', 30, '44444,33333'),
('Start in Bosch', 'https://meet.jit.si/lfPoGX2e', 'Ivalina Hristova Ivanova', '2023-02-13T08:30', 30, '82013');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(46) NOT NULL,
  `fullname` varchar(46) NOT NULL,
  `role` varchar(7) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `fullname`, `role`, `password`) VALUES
('00000', 'Milen Jordanov Petrov', 'teacher', '$2y$10$BAP0tZyxCday0mbmg0oYfOLiIs5sQvd79JwnfRRw9tFY5Lb8ia3mu'),
('00001', 'Evgeniq Dimitrova Velikova', 'teacher', '$2y$10$/0.nl6UkoLmrNwuS1aUQv.opZ7pzEETns29k8I7o/BPlH.K9AM2xu'),
('00002', 'Ivalina Hristova Ivanova', 'teacher', '$2y$10$kUrrtjWfl.DQ1mwueIm5fue3LiIs4afnsMzJ7L2c0qyTjMFUYKgxq'),
('11111', 'Dimitar Ivanov Petrov', 'student', '$2y$10$29QbXJoaZnu9tTzpY7mDpuYoIcCnzVCU9p2b4onlYLWfL9lwKQLa6'),
('22222', 'Ivan Georgiev Mitev', 'student', '$2y$10$GP3.seZaL1FS8K0XOiJ3n.ryEwLA.Q5CPwjQhd.z3ru0xmKCubPrC'),
('33333', 'Mariq Dimitrova Dimitrova', 'student', '$2y$10$gmrVFYn2BMWnWBj.CRIQcuPC8r2C.XEqiyLnJSCrbWA29HSp7BfDG'),
('44444', 'Ralitsa Yrieva Ivanova', 'student', '$2y$10$B/G3mKzEZD52plEhvT7dpOWU4T5HnUoC2390aE0mA2MBihiDHtF2C'),
('55555', 'Vali Hrsitova Ivanova', 'student', '$2y$10$4xleDrlvV3KwZRHyPNALee9EdS3ZEg4CIgMzNxmRqDeAh4Qc.31oq'),
('66666', 'Ralitsa Toneva Hristova', 'student', '$2y$10$KWa1JE.Iq1C9hS/aw3wF3O6Lz8fbavJJNfCB4EWzjtAfDpQWlef2a'),
('82013', 'Hristo Kostov Hristov', 'student', '$2y$10$DGKAYva06/fzZSGo.DamFuEus7hQe31OS93Rv1I.gHEnXKnXlStWG'),
('82092', 'Boicho Zlatanov Zlatanov', 'student', '$2y$10$oebB7ksR9yYw1cV4T6EDvO7NIcTJuh0QWLOU0J14vDU8r5/xVJ11a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delay`
--
ALTER TABLE `delay`
  ADD PRIMARY KEY (`roomname`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`roomname`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
