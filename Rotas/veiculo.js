import express from 'express';
import { registrarVeiculo, listarVeiculos, excluirVeiculo, atualizarVeiculo } from '../controllers/veiculo.js';
import { validarToken } from '../middlewares/validarToken.js';

const routerVeiculo = express.Router();

routerVeiculo.post('/veiculo', validarToken, registrarVeiculo);
routerVeiculo.get('/veiculos', validarToken, listarVeiculos);
routerVeiculo.delete('/veiculo/:id', validarToken, excluirVeiculo);
routerVeiculo.put('/veiculo/:id', validarToken, atualizarVeiculo);

export { routerVeiculo };