import { ITasks } from "../Repository/task.repository";
import { MongoConnection } from "../DB/dbConecction";
import { getFormattedDate } from "../functions/date";


export class TaskImp implements ITasks {
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    async saveTask(res: any, username: string, task_name: string, task_desc: string, limit_date: Date, document: string | null | undefined): Promise<void> {
        try {
            await this.dbConnection.connect();
    
            const collectionUsu = this.dbConnection.db.collection('usuario');
            const collectionTask = this.dbConnection.db.collection('tareas');
    
            // Verificar si el usuario existe
            const usu = await collectionUsu.findOne({ username });
            if (!usu) {
                res.status(404).send({ message: "Usuario no encontrado" });
                return;
            }
    
            // Verificar si la tarea ya existe para este usuario
            const existingTask = await collectionTask.findOne({ task_name, username });
            if (existingTask) {
                res.status(500).send({ message: "Nombre de tarea repetido" });
                return;
            }
    
            // Crear la nueva tarea
            const task = {
                task_name: task_name,
                task_desc: task_desc,
                initial_date: new Date(),
                limit_date: new Date(limit_date),
                document: document,
                estado: "Sin empezar",
                username: username // Agregar el nombre de usuario a la tarea
            };
    
            // Insertar la nueva tarea en la colección de tareas
            const resultTask = await collectionTask.insertOne(task);
    
            // Actualizar la lista de tareas del usuario
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
    

    findAllTasks(res: any): Promise<void> {
        throw new Error("Method not implemented.");
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
    
            const taskToDelete = user.tasks.find((task: any) => task.task_name === task_name);
    
            if (!taskToDelete) {
                res.status(404).send({ message: "Tarea no encontrada en la lista de tareas del usuario" });
                return;
            }
    
            user.tasks = user.tasks.filter((task: any) => task.task_name !== task_name);
    
            await collectionUsu.replaceOne({ username }, user);
    
            await collectionTask.deleteOne({ _id: taskToDelete._id });
    
            res.status(200).send({ message: "Tarea eliminada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
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