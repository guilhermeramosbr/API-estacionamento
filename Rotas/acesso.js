import express from 'express';
import { registrarAcesso, autenticarAcesso } from '../controllers/acesso.js';
import { validarToken } from '../middlewares/validarToken.js';

const routerAcesso = express.Router();

routerAcesso.post('/acesso', validarToken, registrarAcesso);
routerAcesso.post('/acesso/authenticate', autenticarAcesso);

export { routerAcesso };