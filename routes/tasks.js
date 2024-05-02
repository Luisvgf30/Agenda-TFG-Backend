var express = require('express');
var router = express.Router();
const {TaskImp} = require('../dist/Implement/task.imp');

router.post('/createTask', async (req, res, next) => {
  try {
    const taskImp = new TaskImp()
    await taskImp.saveTask(res, req.query.username, req.query.task_name, req.query.task_desc, req.query.limit_date);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.delete('/deleteTask', async (req, res, next) => {
  try {
    const taskImp = new TaskImp();
    await taskImp.deleteTask(res, req.query.username, req.query.task_name);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
}); 

module.exports = router;

