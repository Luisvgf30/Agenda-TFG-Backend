import {INotes} from "../Repository/note.repository";
import {MongoConnection} from "../DB/dbConecction";


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
                { $push: { tasks: resultNote.insertedId } }
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
    async deleteNote(res: any, id: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionNote = this.dbConnection.db.collection('notas');
    
            const nota = await collectionNote.findOne({ id });
    
            await collectionNote.deleteOne({ _id: nota._id });
                        
    
            res.status(200).send({ message: "Nota eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

    
}