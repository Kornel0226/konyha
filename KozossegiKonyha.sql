-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 07. 18:21
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kozossegikonyha`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Főétel', '2024-05-06 17:22:08', '2024-05-06 17:22:08'),
(3, 'Előétel', '2024-05-07 15:29:02', '2024-05-07 15:29:02'),
(4, 'Leves', '2024-05-07 15:29:12', '2024-05-07 15:29:12'),
(5, 'Saláta', '2024-05-07 15:29:32', '2024-05-07 15:29:32'),
(6, 'Desszert', '2024-05-07 15:30:23', '2024-05-07 15:30:23'),
(7, 'Reggeli', '2024-05-07 15:30:32', '2024-05-07 15:30:32'),
(8, 'Ital', '2024-05-07 15:30:39', '2024-05-07 15:30:39');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `name`, `quantity`, `unit`, `recipe_id`, `createdAt`, `updatedAt`) VALUES
(41, 'trappista sajt', 1, '4 szelet', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(42, 'tojás', 1, '', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(43, 'zsemlemorzsa', 1, '1 csésze', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(44, 'só', 1, '1 csipet só', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(45, 'bors', 1, '1 csipet', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(46, 'liszt', 1, '1 evőknaál', 26, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(47, 'paradicsom', 2, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(48, 'labneh', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(49, 'Friss bazsalikomlevél', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(50, 'Extra szűz olivaolaj', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(51, 'Balsamicókrém', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(52, 'Só ízlés szerint', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14'),
(53, 'frissen őrölt fekete bors', 1, '', 30, '2024-05-07 15:48:14', '2024-05-07 15:48:14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` text DEFAULT NULL,
  `description` text NOT NULL,
  `preparation_time` int(11) DEFAULT NULL,
  `difficulty_level` enum('EASY','MEDIUM','HARD') NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `title`, `image`, `description`, `preparation_time`, `difficulty_level`, `user_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
(26, 'Rántott sajt', 'uploads\\recipes\\1715096454303-1715096454303.jpg', 'A sajtszeleteket enyhén megsózva és megborsozva megforgatjuk lisztben.\r\nA tojást felverjük egy tálban.\r\n\r\nA zsemlemorzsát egy másik tálba tesszük.\r\n\r\nA sajtszeleteket először a tojásba mártjuk, majd megforgatjuk a zsemlemorzsában, hogy mindkét oldalukon jól befedjük.\r\n\r\nEgy serpenyőben felhevítjük a növényi olajat közepes lángon.\r\n\r\nAmikor az olaj forró, belefektetjük a sajtszeleteket, és mindkét oldalukon aranybarnára sütjük.\r\n\r\nPapírtörlőre tesszük a sütőből kivett sajtszeleteket, hogy leitatjuk róluk a felesleges olajat.\r\n\r\nTálaljuk forróan, citromkarikával vagy tartármártással.', 20, 'MEDIUM', 2, 3, '2024-05-07 15:40:54', '2024-05-07 15:40:54'),
(30, 'Paradicsomos Caprese Saláta', 'uploads\\recipes\\1715096894201-1715096894201.jpg', 'A paradicsomot és a mozzarellát kör alakú szeletekre vágjuk.\r\n\r\nVáltakozva rakjuk a paradicsom- és mozzarellaszeleteket egy tányérra.\r\n\r\nMindegyik szelet paradicsomra helyezzünk egy friss bazsalikomlevelet.\r\n\r\nÍzesítsük sóval és frissen őrölt fekete borssal.\r\n\r\nLocsoljuk meg extra szűz olívaolajjal és balsamicókrémmel.\r\nFrissen tálaljuk.', 10, 'EASY', 2, 1, '2024-05-07 15:48:14', '2024-05-07 15:48:14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_picture` blob DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `profile_picture`, `is_admin`, `createdAt`, `updatedAt`) VALUES
(1, 'kkory123', 'asd2@mail.com', '$2b$10$XnL/VltJa4QdSklVMZLJ6.E6LenmWSgJdvvFcpbJblKnP828Z5amK', NULL, 0, '2024-05-06 17:12:05', '2024-05-06 17:12:05'),
(2, 'kkoryxd', 'r6kory@gmail.com', '$2b$10$fd5AedmKz1p/C8xZtrNEWumz9w1vMpOAGYiP.3vM903JyEYzSS9w2', NULL, 0, '2024-05-06 17:59:26', '2024-05-06 23:57:34'),
(3, 'teszt', 'teszt@gmail.com', '$2b$10$aAKirdT3e0PAFSihSSERiOJR4yiov8Ys4jclVYK7UaRw5Yw.LPPsS', NULL, 0, '2024-05-07 12:12:13', '2024-05-07 12:12:13'),
(4, 'tesztuser', 'tesztmail@gmail.com', '$2b$10$.rzABPcfh0WiD.fRZohzhOG3lN.l2aDSBQ/40nd3xnVzbAQp6ULbu', NULL, 0, '2024-05-07 15:10:23', '2024-05-07 15:10:23');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
