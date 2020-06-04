-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Gép: localhost
-- Létrehozás ideje: 2020. Jún 04. 09:56
-- Kiszolgáló verziója: 5.5.60-MariaDB
-- PHP verzió: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webaruhaz`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `megrendeles`
--

CREATE TABLE IF NOT EXISTS `megrendeles` (
  `azonosito` int(11) NOT NULL,
  `termek_azonosito` int(11) NOT NULL,
  `vevo_azonosito` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL,
  `vegosszeg` int(11) NOT NULL,
  `megrendeles_datuma` date NOT NULL,
  `utolso_frissites_datuma` date NOT NULL,
  `fizetesi_mod` varchar(100) NOT NULL DEFAULT 'utánvétel',
  `status` varchar(100) NOT NULL DEFAULT 'feldolgozás alatt'
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `megrendeles`
--

INSERT INTO `megrendeles` (`azonosito`, `termek_azonosito`, `vevo_azonosito`, `mennyiseg`, `vegosszeg`, `megrendeles_datuma`, `utolso_frissites_datuma`, `fizetesi_mod`, `status`) VALUES
(1, 1, 1, 1, 250, '2020-06-03', '2020-06-03', 'utánvétel', 'feldolgozás alatt'),
(2, 5, 2, 2, 500, '2020-06-03', '2020-06-03', 'utánvétel', 'feldolgozás alatt'),
(3, 3, 3, 1, 1000, '2020-06-04', '2020-06-04', 'utánvétel', 'feldolgozás alatt'),
(4, 4, 4, 1, 190, '2020-06-04', '2020-06-04', 'utánvétel', 'feldolgozás alatt'),
(8, 6, 5, 1, 210, '2020-06-04', '2020-06-04', 'utánvétel', 'feldolgozás alatt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamlazasi_szallitasi`
--

CREATE TABLE IF NOT EXISTS `szamlazasi_szallitasi` (
  `azonosito` int(11) NOT NULL,
  `cim_tipusa` varchar(100) NOT NULL DEFAULT 'szállítási cím',
  `nev` varchar(100) NOT NULL,
  `orszag` varchar(100) NOT NULL,
  `varos` varchar(100) NOT NULL,
  `iranyitoszam` int(11) NOT NULL,
  `lakcim` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `szamlazasi_szallitasi`
--

INSERT INTO `szamlazasi_szallitasi` (`azonosito`, `cim_tipusa`, `nev`, `orszag`, `varos`, `iranyitoszam`, `lakcim`) VALUES
(1, 'szállítási cím', 'john doe', 'hungary', 'szeged', 6720, 'szeged rokusi krt 84 12'),
(2, 'számlázási cím', 'Alice Cooper', 'Hungary', 'Szeged', 6720, 'Szeged Rókusi krt 2-10'),
(3, 'szállítási cím', 'Bob Marley', 'Jamaica', 'Nine Mile', 1981, 'Jamaica street 1'),
(4, 'számlázási cím', 'Thomas Opamacska', 'France', 'Paris', 7800, 'Paris street 12'),
(8, 'szállítási cím', 'Kate Holmes', 'UK', 'London', 666, 'London street 12');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

CREATE TABLE IF NOT EXISTS `termek` (
  `nev` varchar(100) NOT NULL,
  `cikkszam` int(11) NOT NULL,
  `leiras` varchar(100) NOT NULL,
  `gyarto` varchar(100) NOT NULL,
  `ar` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`nev`, `cikkszam`, `leiras`, `gyarto`, `ar`, `mennyiseg`) VALUES
('cola', 1, 'coca cola üdítő ital 1 l', 'Coca Cola ', 250, 1),
('hamburger', 2, 'sajtos hamburger', 'Mc Donalds', 500, 0),
('gyros', 3, 'gyros pitában', 'kebabos', 1000, 2),
('sajtos chips', 4, 'hullámos sajtos chips', 'Lays', 190, 9),
('búza sör', 5, 'üveges búza sör', 'Soproni', 250, 9),
('3bit', 6, 'vajkaramellás csokoládé', 'Mars', 210, 98);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vevo`
--

CREATE TABLE IF NOT EXISTS `vevo` (
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `szuletesi_ido` date NOT NULL,
  `szallitasi_szamlazasi_azonosito` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `vevo`
--

INSERT INTO `vevo` (`nev`, `email`, `szuletesi_ido`, `szallitasi_szamlazasi_azonosito`) VALUES
('john doe', 'johndoe@hobby.local', '1990-01-01', 1),
('alice', 'alice@hobby.local', '1980-01-01', 2),
('bob', 'bob@hobby.local', '1960-01-01', 3),
('thomas', 'thomas@hobby.local', '1996-12-06', 4),
('kate', 'kate@hobby.local', '1989-01-01', 8);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `megrendeles`
--
ALTER TABLE `megrendeles`
  ADD PRIMARY KEY (`azonosito`),
  ADD UNIQUE KEY `termek_azonosito` (`termek_azonosito`),
  ADD KEY `vevo_azonosito` (`vevo_azonosito`);

--
-- A tábla indexei `szamlazasi_szallitasi`
--
ALTER TABLE `szamlazasi_szallitasi`
  ADD PRIMARY KEY (`azonosito`);

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`cikkszam`);

--
-- A tábla indexei `vevo`
--
ALTER TABLE `vevo`
  ADD UNIQUE KEY `szallitasi_szamlazasi_azonosito` (`szallitasi_szamlazasi_azonosito`),
  ADD KEY `szallitasi_azonosito` (`szallitasi_szamlazasi_azonosito`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `megrendeles`
--
ALTER TABLE `megrendeles`
  MODIFY `azonosito` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `cikkszam` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `megrendeles`
--
ALTER TABLE `megrendeles`
  ADD CONSTRAINT `megrendeles_ibfk_1` FOREIGN KEY (`termek_azonosito`) REFERENCES `termek` (`cikkszam`);

--
-- Megkötések a táblához `szamlazasi_szallitasi`
--
ALTER TABLE `szamlazasi_szallitasi`
  ADD CONSTRAINT `szamlazasi_szallitasi_ibfk_1` FOREIGN KEY (`azonosito`) REFERENCES `vevo` (`szallitasi_szamlazasi_azonosito`);

--
-- Megkötések a táblához `vevo`
--
ALTER TABLE `vevo`
  ADD CONSTRAINT `vevo_ibfk_1` FOREIGN KEY (`szallitasi_szamlazasi_azonosito`) REFERENCES `megrendeles` (`azonosito`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
