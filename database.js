import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function connectDatabase() {
    try {
        await database.authenticate();
        console.log('Banco de dados conectado com sucesso.');
    } catch (error) {
        console.error('Erro na conexão do banco de dados:', error);
    }
}

connectDatabase();

export { database };
