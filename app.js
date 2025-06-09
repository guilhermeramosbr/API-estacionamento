import express from 'express';
import { routerAcesso } from './routes/acesso.js';
import { routerUsuario } from './routes/usuario.js';
import { routerVeiculo } from './routes/veiculo.js';
import { database } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', routerAcesso);
app.use('/api', routerUsuario);
app.use('/api', routerVeiculo);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});