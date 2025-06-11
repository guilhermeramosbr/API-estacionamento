import express from 'express';
import {
    registrarAcesso,
    autenticarAcesso,
    registrarSaida,
    listarAcessos,
    listarSaidas,
    contarPresentes
} from '../controllers/acesso.js';

const routerAcesso = express.Router();

routerAcesso.post('/registrar', registrarAcesso);
routerAcesso.post('/autenticar', autenticarAcesso);
routerAcesso.post('/saida/:idAcesso', registrarSaida);
routerAcesso.get('/listar', listarAcessos);
routerAcesso.get('/saidas', listarSaidas);
routerAcesso.get('/presentes', contarPresentes);

export { routerAcesso };
