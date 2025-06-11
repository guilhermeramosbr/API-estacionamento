import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { database } from './database.js';

import { routerAcesso } from './routes/acesso.js';
import { routerUsuario } from './routes/usuario.js';
import { routerVeiculo } from './routes/veiculo.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Usando o prefixo /api
app.use('/api', routerAcesso);
app.use('/api', routerUsuario);
app.use('/api', routerVeiculo);

await database.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
