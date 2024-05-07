var express = require('express');
var router = express.Router();
const {UserImp} = require('../dist/Implement/user.imp');

router.get('/login', async (req, res, next) => {
  try {
    const usuImp = new UserImp()
    await usuImp.login(res, req.query.username, req.query.password);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});
// cambiar req query por req body para recibir los datos 
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


router.put('/editUsu', async (req, res, next) => {
  try {
    const usuImp = new UserImp()
    await usuImp.updateUser(res, req.query.username, req.query.email, req.query.password, );
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

// router.get('/findAllUsu', async (req, res, next) => {
//   try {
//     const usuImp = new UsersImp();
//     await usuImp.findAllUsus(res);
//   } catch (err) {
//     console.error("Error en la ruta /:", err);
//   }
// });

// router.delete('/deleteUsu', async (req, res, next) => {
//   try {
//     const usuImp = new UsersImp();
//     await usuImp.deleteUsu(res, req.query.email);
//   } catch (err) {
//     console.error("Error en la ruta /:", err);
//   }
// }); 



module.exports = router;
