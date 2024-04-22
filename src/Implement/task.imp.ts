import {ITasks} from "../Repository/task.repository";
import {MongoConnection} from "../DB/dbConecction";


export class TaskImp implements ITasks{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    saveTask(res: any, task_name: string, task_desc: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAllTasks(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteTask(res: any, task_name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateTask(res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}