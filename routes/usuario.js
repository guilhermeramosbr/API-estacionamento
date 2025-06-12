// routes/usuario.js
import express from 'express';
import { listarUsuarios, registrarUsuario, autenticarUsuario } from '../controllers/usuario.js';

const routerUsuario = express.Router();

routerUsuario.get('/usuarios', listarUsuarios);
routerUsuario.post('/usuario', registrarUsuario);
routerUsuario.post('/login', autenticarUsuario);

export { routerUsuario };