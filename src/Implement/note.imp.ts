import {INotes} from "../Repository/note.repository";
import {MongoConnection} from "../DB/dbConecction";


export class NoteImp implements INotes{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    saveNote(res: any, note_desc: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAllNotes(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteNote(res: any, id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateNote(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}