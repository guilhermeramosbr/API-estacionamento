import express from 'express';
import { registrarVeiculo, listarVeiculos, excluirVeiculo, atualizarVeiculo } from '../controllers/veiculo.js';

const routerVeiculo = express.Router();

routerVeiculo.post('/veiculo', registrarVeiculo);
routerVeiculo.get('/veiculos', listarVeiculos);
routerVeiculo.delete('/veiculo/:id', excluirVeiculo);
routerVeiculo.put('/veiculo/:id', atualizarVeiculo);

export { routerVeiculo };
