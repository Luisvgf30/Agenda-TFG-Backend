var express = require('express');
var router = express.Router();
const {UserImp} = require('../dist/Implement/user.imp');

// router.get('/findUsu', async (req, res, next) => {
//   try {
//     const usuImp = new UsersImp()
//     await usuImp.findUsu(res, req.query.email); // Pasar el objeto res
//   } catch (err) {
//     console.error("Error en la ruta /:", err);
//   }
// });

router.post('/singUpUsu', async (req, res, next) => {
  try {
    const usuImp = new UserImp()
    await usuImp.saveUser(res, req.query.username, req.query.password);
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

// router.put('/editUsu', async (req, res, next) => {
//   try {
//     const usuImp = new UsersImp()
//     await usuImp.updateUsu(res, req.query.email, req.query.password, req.query.rol);
//   } catch (err) {
//     console.error("Error en la ruta /:", err);
//   }
// });


module.exports = router;
