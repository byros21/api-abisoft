
const { Router } = require('express');
const { getUsers, getUser, setUser, delUser } = require('../controllers/user.controller');

const router = Router();

router.get("/listar", getUsers);
router.get("/:id", getUser);
router.post("/nuevo", setUser);
router.put("/editar", setUser);
router.delete("/:id", delUser);

module.exports = router;