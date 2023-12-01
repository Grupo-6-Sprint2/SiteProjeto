var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/listar", function (req, res) {
    empresaController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrarEndereco(req, res);
})

router.post("/update/:usuario/:endereco", function (req, res) {
    empresaController.update(req, res);
})


module.exports = router;