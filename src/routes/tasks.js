var express = require('express');
var router = express.Router();
const {TaskImp} = require('../../dist/Implement/task.imp');

router.post('/createTask', async (req, res, next) => {
  try {
    const {username, task_name, task_desc, limit_date, task_level } = req.body;
    const taskImp = new TaskImp()
    await taskImp.saveTask(res, username, task_name, task_desc, limit_date, task_level);
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

router.get('/buscarTasks', async (req, res, next) => {
  try {
    const taskImp = new TaskImp()
    await taskImp.findAllTasks(res, req.query.username);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.put('/editTask', async (req, res, next) => {
  try {
    const { username, old_task_name, new_task_name, new_task_desc, new_limit_date, new_estado, new_task_level} = req.body;
    const taskImp = new TaskImp();
    await taskImp.updateTask(res, username, old_task_name, new_task_name, new_task_desc, new_limit_date, new_estado, new_task_level);
  } catch (err) {
    console.error("Error en la ruta /updateTask:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = router;

