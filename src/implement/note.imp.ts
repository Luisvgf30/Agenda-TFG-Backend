import {INotes} from "../repository/note.repository";
import {MongoConnection} from "../db/dbConecction";
const ObjectId = require('mongodb').ObjectId;


export class NoteImp implements INotes{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    async saveNote(res: any, username: string, note_desc: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionNote = this.dbConnection.db.collection('notas');
    
            const usu = await collectionUsu.findOne({ username });
            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const note = {
                note_desc: note_desc,
                note_date: new Date()
            };
    
            const resultNote = await collectionNote.insertOne(note);
    
            await collectionUsu.updateOne(
                { username: username },
                { $push: { notes: resultNote.insertedId } }
            );
    
            res.status(200).send(resultNote);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    async findAllNotes(res: any, username: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
    
            const user = await collectionUsu.findOne({ username });
    
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const collectionNotes = this.dbConnection.db.collection('notas');

            const notes = await collectionNotes.find({ _id: { $in: user.notes } }).toArray();

            if (notes.length==0) {
                res.status(404).send({ message: "No tiene notas" });
                return;
            }else{
                res.status(200).send(notes);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    async deleteNote(res: any, username: string, id: string): Promise<void> {
        try {
            await this.dbConnection.connect();
            
            const collectionNote = this.dbConnection.db.collection('notas');
            const collectionUsu = this.dbConnection.db.collection('usuario');
            
            const objectId = new ObjectId(id);
    
            const nota = await collectionNote.findOne({ _id: objectId });
    
            if (nota) {
                await collectionNote.deleteOne({ _id: objectId });
    
                await collectionUsu.updateOne(
                    { username: username },
                    { $pull: { notes: objectId  } } 
                );
    
                res.status(200).send({ message: "Nota eliminada exitosamente" });
            } else {
                res.status(404).send({ message: "La nota no fue encontrada" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    
    
    

    
}