var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrarEndereco(req, res) {

  var emailGestor = req.body.emailServer; 
  var senhaGestor = req.body.senhaServer;

  var nomeEmpresa = req.body.empresaNomeServer;

  var nomeRua = req.body.ruaServer; 
  var numero = req.body.numeroServer;
  var estado = req.body.estadoServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var CEP = req.body.cepServer
  var telefoneEmpresa = req.body.telefoneEmpresaServer

      empresaModel.cadastrarEndereco(nomeRua, numero, CEP, estado, cidade, bairro, nomeEmpresa, emailGestor, senhaGestor, telefoneEmpresa)
      .then((resultado) => {
        res.status(201).json(resultado);
      });
    }


    function update(req, res) {
      var endereco = req.params.endereco;
      var usuario = req.params.usuario;
  
          empresaModel.update(usuario, endereco).then((resultado) => {
            res.status(201).json(resultado);
          });
        }

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  cadastrarEndereco,
  listar,
  update,
};
