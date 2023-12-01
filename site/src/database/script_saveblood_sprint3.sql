create database saveblood;
use saveblood;
drop database saveblood;

create table empresa (
CNPJ char(11) primary key,
nome varchar(45)
);

insert into empresa (nome, responsável) values
('saveBlood', 'Samuel Oliveira'),
('Doe Já', 'Larisso Manoel'),
('SangueFluido', 'Gagliasso Peixinho');

create table endereco (
idEndereco int primary key auto_increment,
nomeRua varchar(45),
numero varchar(10),
CEP char(8),
estado char(2),
cidade varchar(45),
bairro varchar(45),
telefoneEmpresa varchar(20),
fkEmpresa char(11),
fkResponsavel int,
constraint FKEe foreign key (fkEmpresa) references empresa(CNPJ)
) auto_increment = 100;

insert into endereco (nomeRua, numero, CEP, estado, cidade, bairro, CNPJ, fkEmpresa) values
('Hadock Lobo', '0932', '01234567', 'SP', 'São Paulo', 'Paulista', '12345678909', 1),
('Canadense', '126', '09876543', 'SP', 'São Paulo', 'Osasco', '09876543212', 2),
('Liberdade', '632', '01928374', 'SP', 'São Paulo', 'Liberdade', '10293847565', 3),
('Diadema', '1574', '20938475', 'MG', 'Belo Horizonte', 'Justinopolis', '67584930212', 1),
('Parapicuiba', '1694', '21046965', 'SP', 'Peruibe', 'Anhagabau', '6574389101', 2);

create table usuario (
idUsuario int primary key auto_increment,
email varchar(100),
senha varchar(100),
nomeNick varchar(45),
telefone varchar(45),
fkEndereco int,
fkGestor int,
constraint FKENd foreign key (fkEndereco) references endereco(idEndereco),
constraint FKGESt foreign key (fkGestor) references usuario(idUsuario)
) auto_increment = 200;

-- inserindo a fkResponsavel dentro da tabela endereço
-- agora que a tabela usuario existe

alter table endereco add constraint FKRe foreign key (fkResponsavel) references usuario(idUsuario);

-- testes de banco




insert into usuario values
(null, 'joia@gmail.com', '123', 'Paulo', '11 9021381293', null, null);

insert into endereco values
(null, 'hadock lobo', '213', '12345678', 'sp', 'são paulo', 'paulista', '12345678910', (select idUsuario from usuario where email = 'joia@gmail.com' and senha = '123'));

insert into empresa values 
('12345678910', 'Mandioquinha');

insert into empresa values 
('12345678911', 'Laranja');

-- cria a foreign key da tabela empresa, para o responsável
alter table empresa add constraint responsavel_foreignKey foreign key (fkResponsavel) references usuario(idUsuario);

-- gestores
insert into usuario (email, senha, nomeNick, telefone, fkEndereco) values
('Caioleal@gmail.com', 'caio123', 'CaioLeal','(11) 98765-4321', 100),
('FatimaCalçado@gmail.com', 'calcados12490@432', 'Fatima Calçado','(11) 91234-5677', 101),
('FernandoBrandão@gmail.com', '#34#!f9as!0934', 'Big Brando','(11) 90876-1523', 102);

-- monitoradores
insert into usuario (email, senha, nomeNick, telefone, fkEndereco, fkGestor) values 
('Thiago.Gomes@gmail.com', '39248236', 'Gomes','(11)98776-5231', 100, 200),
('Manoela@gmail.com', 'Manoelinha123', 'Larissa Manoela','(11) 98233-3281', 101, 201),
('Joao@gmail.com', 'Joao1239851', 'Joao Pedro','(11) 91248-1256', 102, 202),
('Tulinho@gmail.com', 'TuLLi0#124', 'Túlinho','(11) 91376-2366', 100, 200);

create table sensor (
idSensor int primary key auto_increment,
geladeira varchar(45),
fkEndereco int,
constraint FKGELa foreign key (fkEndereco) references endereco(idEndereco)
) auto_increment = 1000;

insert into sensor (geladeira, fkEndereco) values
('Geladeira #2502', 100);

truncate table sensor;

create table registro (
idRegistro int primary key auto_increment,
horario datetime default current_timestamp,
temperatura decimal (2,1),
fkSensor int,
constraint FKSENSOr foreign key (fkSensor) references sensor(idSensor)
) auto_increment = 100000;

drop table registro;

insert into registro (temperatura, fkSensor) values
(05.2, 1000),
(05.5, 1000),
(03.2, 1000),
(02.6, 1000),
(04.2, 1000),

(03.5, 1001),
(03.5, 1001),
(05.2, 1001),
(02.6, 1001),
(07.2, 1001),

(05.2, 1002),
(03.4, 1002),
(04.5, 1002),
(06.2, 1002),
(06.1, 1002),

-- endereço 1 acima ^^^

(04.2, 1003),
(04.5, 1003),
(02.6, 1003),
(05.9, 1003),
(02.8, 1003),

(04.9, 1004),
(02.5, 1004),
(04.6, 1004),
(01.5, 1004),
(02.1, 1004),

(06.2, 1005),
(02.5, 1005),
(05.6, 1005),
(03.4, 1005),
(05.3, 1005),

-- endereço 2 acima ^^^

(03.5, 1006),
(06.3, 1006),
(03.5, 1006),
(01.4, 1006),
(04.9, 1006),

(04.6, 1007),
(02.4, 1007),
(05.6, 1007),
(03.6, 1007),
(02.4, 1007),

(05.8, 1008),
(03.7, 1008),
(05.7, 1008),
(02.5, 1008),
(01.4, 1008);

truncate table registro;

-- select das empresas e seus respectivos endereços
select empresa.nome as empresa, endereco.nomeRua as endereço from empresa join endereco on idEmpresa = fkEmpresa;

-- select dos usuarios e seus respectivos gestores
select usuario.nomeNick as Usuario, gestor.NomeNick as Gestor from usuario as Usuario
join usuario as Gestor on Usuario.idUsuario = Gestor.fkGestor;

-- select dos sensores e seus respectivos registros de um determinado sensor
select sensor.geladeira as Sensor, registro.temperatura, registro.horario as Temp from sensor
join registro on idSensor = fkSensor 
where sensor.idSensor = 1003;

-- select de um sensor e seu respectivo endereço e respectiva empresa
select sensor.geladeira as Sensor, endereco.nomeRua as Endereço, empresa.nome as Empresa from sensor
join endereco on idEndereco = fkEndereco
join empresa on idEmpresa = fkEmpresa;

-- Pegar os usuários e suas respectivas empresas
select usu.nomeNick as 'Nome do usuário', emp.nome as NomeEmpresa  from usuario as usu
join endereco as ender on usu.fkEndereco = ender.idEndereco
join empresa as emp on ender.fkEmpresa = emp.idEmpresa;

