const { MongoClient } = require('mongodb');

class MongoConnection {
    constructor() {
        this.url = `mongodb://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.IP_MAQUINA}:${process.env.PORT_MONGO}`;
        this.dbName = `${process.env.NOMBRE_BBDD_MONGO}`;
        this.client = new MongoClient(this.url);
        this.db = null;
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

module.exports = { MongoConnection };
