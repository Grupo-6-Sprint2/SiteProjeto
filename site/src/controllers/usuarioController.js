var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nomeNick,
                            senha: resultadoAutenticar[0].senha,
                            telefone: resultadoAutenticar[0].telefone,
                            gestor: resultadoAutenticar[0].fkGestor,
                            endereco: resultadoAutenticar[0].fkEndereco


                        });
                    }



                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

    function listar(req, res) {

        var gestor = req.params.gestor

        usuarioModel.listar(gestor).then((resultado) => {
          res.status(200).json(resultado);
        });
      }

    function cadastrar(req, res) {
        // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
        var nome = req.body.nomeResponsavel;
        var email = req.body.email;
        var senha = req.body.senha;
        var telefone = req.body.telefone
        var fkGestor = req.body.fkGestorServer
        var endereco = req.body.enderecoServer

        // Faça as validações dos valores
        if (nome == undefined) {
            res.status(400).send("Seu nome está undefined!");
        } else if (email == undefined) {
            res.status(400).send("Seu email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("Sua senha está undefined!");
        } else if (telefone == undefined) {
            res.status(400).send("Sua empresa está undefined!");
        } else {

            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrar(nome, email, senha, telefone, fkGestor, endereco)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }
    }

    function pegarID(req, res) {

        var email = req.params.emailUser;
        var senha = req.params.senhaUser;
        var cep = req.params.cep


        usuarioModel.pegarID(email, senha, cep).then(function (resultado) {

            res.status(200).json(resultado);
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        })
    }

    module.exports = {
        autenticar,
        cadastrar,
        pegarID,
        listar
}