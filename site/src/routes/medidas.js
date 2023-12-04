var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/lm35", function (req, res) {
    medidaController.buscarUltimasMedidas(res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;