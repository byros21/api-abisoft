
const { Router } = require('express');
const { getPlatos, getPlato, setPlato, delPlato, getColores } = require('../controllers/platos.controller');

const router = Router();

router.get("/listar", getPlatos);
router.get("/:id", getPlato);
router.post("/nuevo", setPlato);
router.put("/editar", setPlato);
router.delete("/:id", delPlato);

router.get("/detalle/color", getColores);


module.exports = router;