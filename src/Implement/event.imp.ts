import {IEvents} from "../Repository/event.repository";
import {MongoConnection} from "../DB/dbConecction";


export class EventImp implements IEvents{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    saveEvent(res: any, event_name: string, event_desc: string, event_date: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAllEvents(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteEvent(res: any, event_name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateEvent(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}