-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.26-0ubuntu0.18.10.1 - (Ubuntu)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para teste_javascript
CREATE DATABASE IF NOT EXISTS `teste_javascript` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `teste_javascript`;

-- Copiando estrutura para tabela teste_javascript.setor
CREATE TABLE IF NOT EXISTS `setor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela teste_javascript.setor: ~0 rows (aproximadamente)
DELETE FROM `setor`;
/*!40000 ALTER TABLE `setor` DISABLE KEYS */;
/*!40000 ALTER TABLE `setor` ENABLE KEYS */;

-- Copiando estrutura para tabela teste_javascript.setor_usuario
CREATE TABLE IF NOT EXISTS `setor_usuario` (
  `setor_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `grant_access` tinyint(4) NOT NULL DEFAULT '0',
  KEY `account_role_role_id_fkey` (`setor_id`),
  KEY `account_role_user_id_fkey` (`usuario_id`),
  CONSTRAINT `account_role_role_id_fkey` FOREIGN KEY (`setor_id`) REFERENCES `setor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `account_role_user_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela teste_javascript.setor_usuario: ~0 rows (aproximadamente)
DELETE FROM `setor_usuario`;
/*!40000 ALTER TABLE `setor_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `setor_usuario` ENABLE KEYS */;

-- Copiando estrutura para tabela teste_javascript.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela teste_javascript.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
