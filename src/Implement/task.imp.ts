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

    // async findAllUsers(res: any): Promise<void> {
    //     try{
    //         await this.dbConnection.connect();

    //         const collection = this.dbConnection.db.collection('Usuario');

    //         const usuarios = await collection.find().toArray();

    //         if (usuarios.length > 0) {
    //             res.status(200).send(usuarios);
    //         } else {
    //             res.status(404).send({ message: "Usuarios no encontrados" });
    //         }

    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({message: "Internal server error"});
    //     } finally {
    //         await this.dbConnection.closeConnection();
    //     }
    // }
    
    // async deleteUser(res: any, email: string): Promise<void> {
    //     try {
    //         await this.dbConnection.connect();
    
    //         const collection = this.dbConnection.db.collection('Usuario');
            
    //         const result = await collection.deleteOne({ email });
    
    //         if (result.deletedCount && result.deletedCount > 0) {
    //             res.status(200).send({ message: "Usuario eliminado exitosamente" });
    //         } else {
    //             console.log("hola")
    //             res.status(404).send({ message: "Usuario no encontrado" });
    //         }
    
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({ message: "Internal server error" });
    //     } finally {
    //         await this.dbConnection.closeConnection();
    //     }
    // }
}