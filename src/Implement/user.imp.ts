import {IUsers} from "../Repository/user.repository";
import {MongoConnection} from "../DB/dbConecction";


export class UserImp implements IUsers{
    private dbConnection: MongoConnection

    constructor() {
        this.dbConnection = new MongoConnection();
    }
    

    async login(res: any, username: string, password: string): Promise<void> {
        try{
            await this.dbConnection.connect();

            const collection = this.dbConnection.db.collection('usuario');

            const usu = await collection.findOne({ username }); 

            if (usu) {  // Verifica si se encontró un usuario
                if (usu.password === password) {  
                    res.status(200).send(usu);
                } else {
                    res.status(201).send({ message: "Contraseña incorrecta" });
                }
            } else {
                res.status(404).send({ message: "Usuario no encontrado" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Internal server error"});
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

    async saveUser(res: any, username: string, email: string, password: string): Promise<void> {
        try{
            await this.dbConnection.connect();

            const collection = this.dbConnection.db.collection('usuario');

            var controlador = false;
            const usuarios = await collection.find().toArray();

            for(var i = 0; i < usuarios.length; i++){
                if(usuarios[i].username == username || usuarios[i].email == email){
                    controlador = true;
                }
            }
            if(!controlador){
                const usuario = {
                    username: username,
                    email: email,
                    password: password,
                    foto: null,
                    diary_time: null,
                    tasks: [],
                    notes: [],
                    events: []
                }
                const result = await collection.insertOne(usuario);
                res.status(204).send(result);
            }else{
                res.status(500).send({message: "Username o Email repetido "});
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Internal server error"});
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

    async updateUser(res: any, email: string, username: string, password: string, foto: string, diary_time: Date): Promise<void> {
        try {
            await this.dbConnection.connect();

            const collection = this.dbConnection.db.collection('usuario');

            const usuario = await collection.findOne({ username: username });

            if (usuario) {
                const updatedUser: any = {};

                    updatedUser.email = email;
                    updatedUser.password = password;              
                    updatedUser.foto = foto;              
                    updatedUser.diary_time = diary_time;

                const result = await collection.updateOne(
                    { username: username },
                    { $set: updatedUser }
                );

                if (result.modifiedCount > 0) {
                    res.status(200).send({ message: "Usuario actualizado correctamente" });
                } else {
                    res.status(500).send({ message: "Error al actualizar el usuario" });
                }
                
            } else {
                res.status(404).send({ message: "Usuario no encontrado" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        } finally {
            await this.dbConnection.closeConnection();
        }
    }

}

