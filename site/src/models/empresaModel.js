var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa;`;
  
  return database.executar(query);
}

// função usada para cadastrar o endereço colocado dentro da página
// cadastrato-empresa.html
function cadastrarEndereco(nomeRua, numero, CEP, estado, cidade, bairro, nomeEmpresa, emailGestor, senhaGestor, telefoneEmpresa) {
  var query = `insert into endereco (nomeRua, numero, CEP, estado, cidade, bairro, telefoneEmpresa, fkEmpresa, fkResponsavel) values
    ('${nomeRua}', '${numero}', '${CEP}', '${estado}', '${cidade}', '${bairro}', '${telefoneEmpresa}', (select CNPJ from empresa where nome = '${nomeEmpresa}'), (select idUsuario from usuario where email = '${emailGestor}' and senha = '${senhaGestor}'))
  `

  return database.executar(query);
}

function update(usuario, endereco) {
  var query = `
    update usuario set fkEndereco = ${endereco} where idUsuario = ${usuario};
  `;

  return database.executar(query);
}


function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, cadastrarEndereco, listar, update };
