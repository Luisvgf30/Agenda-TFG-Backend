import { ITasks } from "../repository/task.repository";
import { MongoConnection } from "../db/dbConecction";
import { getFormattedDate } from "../functions/date";
import { ObjectId } from "mongodb";


export class TaskImp implements ITasks {
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    async saveTask(res: any, username: string,  task_name: string, task_desc: string, limit_date: Date, task_level: string ): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionTask = this.dbConnection.db.collection('tareas');
    
            const usu = await collectionUsu.findOne({ username });

            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const existingTask = await collectionTask.findOne({ task_name, username });
            if (existingTask) {
                res.status(500).send({ message: "Nombre de tarea repetido" });
                return;
            }
    
            const task = {
                task_name: task_name,
                task_desc: task_desc,
                initial_date: new Date(),
                limit_date: new Date(limit_date),
                estado: "Sin empezar",
                level: task_level,
                username: username
            };
    
            const resultTask = await collectionTask.insertOne(task);
    
            await collectionUsu.updateOne(
                { username: username },
                { $push: { tasks: resultTask.insertedId } }
            );
    
            res.status(200).send(resultTask);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    

    async findAllTasks(res: any, username: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
    
            const user = await collectionUsu.findOne({ username });
    
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const collectionTask = this.dbConnection.db.collection('tareas');

            const tasks = await collectionTask.find({ _id: { $in: user.tasks } }).toArray();

            if (tasks.length==0) {
                res.status(404).send({ message: "No tiene tareas" });
                return;
            }else{
                res.status(200).send(tasks);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

    async deleteTask(res: any, username: string, task_name: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionTask = this.dbConnection.db.collection('tareas');
            const collectionUsu = this.dbConnection.db.collection('usuario');
    
            const user = await collectionUsu.findOne({ username });
    
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            const tasks = await collectionTask.find({ task_name }).toArray();
            let deletedTask = false;
    
            for (let i = 0; i < user.tasks.length; i++) {
                for (let j = 0; j < tasks.length; j++) {
                    if (user.tasks[i].toString() === tasks[j]._id.toString()) {
                        await collectionTask.deleteOne({ _id: tasks[j]._id });
                        user.tasks = user.tasks.filter((taskId: any) => taskId.toString() !== tasks[j]._id.toString());
                        deletedTask = true;
                    }
                }
            }
    
            await collectionUsu.replaceOne({ username }, user);
    
            if (!deletedTask) {
                res.status(404).send({ message: "Tarea no encontrada en la lista de tareas del usuario" });
                return;
            }
    
            res.status(200).send({ message: "Tarea eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    
    
    
    async updateTask(res: any, username: string, old_task_name: string, new_task_name: string, new_task_desc: string, new_limit_date: Date, new_estado: string, new_task_level: string): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionTask = this.dbConnection.db.collection('tareas');
    
            const usu = await collectionUsu.findOne({ username });
            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }

            const tasks = await collectionTask.find({ task_name : old_task_name }).toArray();

            let existingTask = false;
            let id = null;
    
            for (let i = 0; i < usu.tasks.length; i++) {
                for (let j = 0; j < tasks.length; j++) {
                    if (usu.tasks[i].toString() === tasks[j]._id.toString()) {
                        id =  tasks[j]._id.toString()
                        existingTask = true;
                    }
                }
            }
            if (!existingTask) {
                res.status(404).send({ message: "Tarea no encontrada para este usuario" });
                return;
            }

            const task = await collectionTask.findOne({ _id : new ObjectId(id) });
            const result = await collectionTask.updateOne(
                { _id: task._id },
                {
                    $set: {
                        task_name: new_task_name,
                        task_desc: new_task_desc,
                        limit_date: new_limit_date,
                        estado: new_estado, 
                        task_level: new_task_level
                    }
                }
            );
    
            if (result.modifiedCount && result.modifiedCount > 0) {
                res.status(200).send({ message: "Tarea actualizada exitosamente" });
            } else {
                res.status(500).send({ message: "No se pudo actualizar la tarea" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }
    
    
    
   


}