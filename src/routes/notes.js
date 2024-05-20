var express = require('express');
var router = express.Router();
const {NoteImp} = require('../../dist/Implement/note.imp');

router.post('/createNote', async (req, res, next) => {
  try {
    const { username, note_desc} = req.body;
    const noteImp = new NoteImp();
    await noteImp.saveNote(res, username, note_desc);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});

router.delete('/deleteNote', async (req, res, next) => {
  try {
    const noteImp = new NoteImp();
    await noteImp.deleteNote(res, req.query.username, req.query.id);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
}); 

router.get('/buscarNotes', async (req, res, next) => {
  try {
    const noteImp = new NoteImp()
    await noteImp.findAllNotes(res, req.query.username);
  } catch (err) {
    console.error("Error en la ruta /:", err);
  }
});


module.exports = router;

