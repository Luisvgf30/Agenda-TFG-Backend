import {IEvents} from "../repository/event.repository";
import {MongoConnection} from "../db/dbConecction";
import { ObjectId } from "mongodb";


export class EventImp implements IEvents{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    async saveEvent(res: any, username: string, event_name: string, event_desc: string, event_date: Date): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionEvent = this.dbConnection.db.collection('eventos');
    
            const usu = await collectionUsu.findOne({ username });
            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const existingEvent = await collectionEvent.findOne({ event_name, username });
            if (existingEvent) {
                res.status(500).send({ message: "Nombre de tarea repetido" });
                return;
            }
    
            const event = {
                event_name: event_name,
                event_desc: event_desc,
                event_date: new Date(event_date),
                username: username
            };
    
            const resultEvent = await collectionEvent.insertOne(event);
    
            await collectionUsu.updateOne(
                { username: username },
                { $push: { events: resultEvent.insertedId } }
            );
    
            res.status(200).send(resultEvent);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    async findAllEvents(res: any, username: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
    
            const user = await collectionUsu.findOne({ username });
    
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const collectionEvent = this.dbConnection.db.collection('eventos');

            const events = await collectionEvent.find({ _id: { $in: user.events } }).toArray();

            if (events.length==0) {
                res.status(404).send({ message: "No tiene eventos" });
                return;
            }else{
                res.status(200).send(events);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }     
    }
    async deleteEvent(res: any, username: string, event_name: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionEvent = this.dbConnection.db.collection('eventos');
            const collectionUsu = this.dbConnection.db.collection('usuario');
    
            const user = await collectionUsu.findOne({ username });
    
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const events = await collectionEvent.find({ event_name }).toArray();
            let deletedEvent = false;
    
            for (let i = 0; i < user.events.length; i++) {
                for (let j = 0; j < events.length; j++) {
                    if (user.events[i].toString() === events[j]._id.toString()) {
                        await collectionEvent.deleteOne({ _id: events[j]._id });
                        user.events = user.events.filter((eventId: any) => eventId.toString() !== events[j]._id.toString());
                        deletedEvent = true;
                    }
                }
            }
    
            await collectionUsu.replaceOne({ username }, user);
    
            if (!deletedEvent) {
                res.status(404).send({ message: "Evento no encontrado en la lista de eventos del usuario" });
                return;
            }
    
            res.status(200).send({ message: "Evento eliminado exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    async updateEvent(res: any, username: string,  old_event_name: string, new_event_name: string, new_event_desc: string, new_event_date: Date): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionEvent = this.dbConnection.db.collection('eventos');
    
            const usu = await collectionUsu.findOne({ username });
            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }

            const events = await collectionEvent.find({ event_name : old_event_name }).toArray();

            let existingEvent = false;
            let id = null;
    
            for (let i = 0; i < usu.events.length; i++) {
                for (let j = 0; j < events.length; j++) {
                    if (usu.events[i].toString() === events[j]._id.toString()) {
                        id =  events[j]._id.toString()
                        existingEvent = true;
                    }
                }
            }
            if (!existingEvent) {
                res.status(404).send({ message: "Evento no encontrado para este usuario" });
                return;
            }

            const task = await collectionEvent.findOne({ _id : new ObjectId(id) });
            const result = await collectionEvent.updateOne(
                { _id: task._id },
                {
                    $set: {
                        event_name: new_event_name,
                        event_desc: new_event_desc,
                        event_date: new_event_date
                    }
                }
            );
    
            if (result.modifiedCount && result.modifiedCount > 0) {
                res.status(200).send({ message: "Evento actualizado exitosamente" });
            } else {
                res.status(500).send({ message: "No se pudo actualizar el evento" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

    
}