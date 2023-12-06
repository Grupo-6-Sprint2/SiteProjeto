var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(res) {

    medidaModel.buscarUltimasMedidas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarMedidasEmTempoReal(req, res) {
    
    var idAquario = req.params.idAquario;
    
    console.log(`Recuperando medidas em tempo real`);
    
    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasSensor(req, res) {
    
    var idSensor = req.params.idSensor;
    
    console.log(`Recuperando medidas em tempo real`);
    
    medidaModel.buscarUltimasMedidasSensor(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealSensor(req, res) {
    
    var idSensorR = req.params.idSensor;
    
    console.log(`Recuperando medidas em tempo real`);
    
    medidaModel.buscarUltimasMedidasSensor(idSensorR).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




function alertas(req, res) {
    
    console.log('poggers')
    var fkEndereco = req.params.fkEndereco
    
    console.log(`Recuperando medidas em tempo real`);
    
    medidaModel.alertas(fkEndereco).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}





function mediaAlertas(req, res) {
    console.log(`pegando média de alertas`);
    
    medidaModel.mediaAlertas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtnSensor(req, res) {

    var fkEndereco = req.params.fkEndereco

    medidaModel.qtnSensor(fkEndereco).then(function (resultado) {
        if (resultado.length>0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function alterarAcesso(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var idAlerta = req.params.idAlerta

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        medidaModel.alterarAcesso(idAlerta)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimasMedidasSensor,
    buscarMedidasEmTempoRealSensor,
    alertas,
    mediaAlertas,
    qtnSensor,
    alterarAcesso

}