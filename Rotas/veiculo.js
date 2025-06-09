import express from 'express'
import { registrarVeiculo, listarVeiculos, excluirVeiculo, atualizarVeiculo } from '../controllers/veiculo.js'
import { validarToken } from '../middlewares/usuario.js'

const routerVeiculo= express.Router()

routerTarefa.post('/veiculo', validarToken, registrarVeiculo)
routerTarefa.get('/veiculo', validarToken, listarVeiculos)
routerTarefa.delete('/veiculo/:id', validarToken, excluirVeiculo)
routerTarefa.put('/veiculo/:id', validarToken, atualizarVeiculo)

export { routerVeiculo }