import express from 'express';
import { registrarUsuario, autenticarUsuario } from '../controllers/usuario.js';

const routerUsuario = express.Router();

routerUsuario.post('/usuario', registrarUsuario);
routerUsuario.post('/login', autenticarUsuario);

export { routerUsuario };
