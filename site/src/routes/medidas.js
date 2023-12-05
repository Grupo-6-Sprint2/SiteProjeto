var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/lm35", function (req, res) {
    medidaController.buscarUltimasMedidas(res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarDados/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidasSensor(req, res);
});

router.get("/buscarUltimosDados/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoRealSensor(req, res);
});

router.get("/alertas", function (req, res) {
    medidaController.alertas(req, res);
});



module.exports = router;