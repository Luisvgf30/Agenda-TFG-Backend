const { MongoClient } = require('mongodb');

export class MongoConnection {
    private url: string;
    private dbName: string;
    private client: typeof MongoClient;
    public db: any;
    
    constructor() {
        this.url = `${process.env.URI}`;
        this.dbName = `${process.env.NOMBRE_BBDD_MONGO}`;
        this.client = new MongoClient(this.url);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Conexión a la base de datos establecida.');
            this.db = this.client.db(this.dbName);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    async closeConnection() {
        try {
            await this.client.close();
            console.log('Conexión a la base de datos cerrada.');
        } catch (error) {
            console.error('Error al cerrar la conexión a la base de datos:', error);
            throw error;
        }
    }

}

