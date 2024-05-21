var express = require('express');
var router = express.Router();
const {UserImp} = require('../../dist/Implement/user.imp');

router.get('/login', async (req, res, next) => {
  try {
    const usuImp = new UserImp()
    await usuImp.login(res, req.query.username, req.query.password);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.post('/singUpUsu', async (req, res, next) => {
  try {
      const { username, email, password } = req.body;
      const usuImp = new UserImp();
      await usuImp.saveUser(res, username, email, password);
  } catch (err) {
      console.error("Error en la ruta /singUpUsu:", err);
      res.status(500).send({ message: "Error interno del servidor" });
  }
});

router.get('/buscarUsu', async (req, res, next) => {
  try {
    const usuImp = new UserImp()
    await usuImp.findByUsername(res, req.query.username);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.put('/editUsu', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuImp = new UserImp()
    await usuImp.updateUser(res, req.query.username, email, password);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});




module.exports = router;
