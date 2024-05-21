var express = require('express');
var router = express.Router();
const {EventImp} = require('../../dist/Implement/event.imp');

router.post('/createEvent', async (req, res, next) => {
  try {
    const { username, event_name, event_desc , event_date } = req.body;
    const eventImp = new EventImp();
    await eventImp.saveEvent(res,  username, event_name, event_desc , event_date);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.delete('/deleteEvent', async (req, res, next) => {
  try {
    const eventImp = new EventImp();
    await eventImp.deleteEvent(res, req.query.username, req.query.event_name);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
}); 

router.get('/buscarEvents', async (req, res, next) => {
  try {
    const eventImp = new EventImp()
    await eventImp.findAllEvents(res, req.query.username);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.put('/editEvent', async (req, res, next) => {
    try {
      const { username, old_event_name, new_event_name, new_event_desc, new_event_date} = req.body;
      const eventImp = new EventImp();
      await eventImp.updateEvent(res, username, old_event_name, new_event_name, new_event_desc, new_event_date);
    } catch (err) {
      console.error("Error en la ruta /updateEvent:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  });


module.exports = router;

