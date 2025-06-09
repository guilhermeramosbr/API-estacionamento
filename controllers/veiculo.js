import { Veiculo } from '../models/veiculo.js';
import jwt from 'jsonwebtoken';

const segredoJwt = process.env.SEGREDO_JWT;

const registrarVeiculo = async (req, res) => {
    try {
        const { modelo, placa, ano } = req.body;
        if (!modelo || !placa || !ano) {
            return res.status(400).send({ mensagem: 'Dados incompletos' });
        }
        const veiculoExistente = await Veiculo.findOne({ where: { placa } });
        if (veiculoExistente) {
            return res.status(400).send({ mensagem: 'Veículo já cadastrado' });
        }
        await Veiculo.create({ modelo, placa, ano });
        res.status(201).send({ mensagem: 'Veículo foi cadastrado' });
    } catch (erroDisparado) {
        console.log(erroDisparado);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
}

const autenticarCarro = async (req, res) => {
    try {
        const { placa } = req.body;
        if (!placa) {
            return res.status(400).send({ mensagem: 'Dados incompletos' });
        }
        const buscarVeiculoPorPlaca = await Veiculo.findOne({ where: { placa } });
        if (!buscarVeiculoPorPlaca) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado' });
        }
        const conteudoDoToken = { idVeiculo: buscarVeiculoPorPlaca.id };
        const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' });
        return res.status(201).send({ token });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
}

export { registrarVeiculo, autenticarCarro };