import express from 'express';
// Importe a nova função de controlador
import { registrarVeiculo, listarVeiculos, excluirVeiculo, atualizarVeiculo, buscarVeiculoPorPlacaGET } from '../controllers/veiculo.js';

const routerVeiculo = express.Router();

routerVeiculo.post('/veiculo', registrarVeiculo);
routerVeiculo.get('/veiculos', listarVeiculos);
routerVeiculo.delete('/veiculo/:id', excluirVeiculo);
routerVeiculo.put('/veiculo/:id', atualizarVeiculo);
routerVeiculo.get('/veiculo', buscarVeiculoPorPlacaGET); // <--- Adicione esta linha!

export { routerVeiculo };
