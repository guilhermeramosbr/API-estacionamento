// routes/usuario.js
import express from 'express';
import { listarUsuarios, registrarUsuario, autenticarUsuario } from '../controllers/usuario.js';
import { validarToken } from './middlewares/validarToken.js';

const routerUsuario = express.Router();

routerUsuario.get('/usuarios', validarToken, listarUsuarios);
routerUsuario.post('/usuario', registrarUsuario);
routerUsuario.post('/login', autenticarUsuario);

export { routerUsuario };