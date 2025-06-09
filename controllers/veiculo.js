import { Veiculo } from '../models/veiculo.js';
import jwt from 'jsonwebtoken';

const segredoJwt = process.env.JWT_SECRET;

const registrarVeiculo = async (req, res) => {
    try {
        const { modelo, placa, ano, cor, usuarioId } = req.body;
        if (!modelo || !placa || !ano || !cor || !usuarioId) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const veiculoExistente = await Veiculo.findOne({ where: { placa } });
        if (veiculoExistente) {
            return res.status(400).send({ mensagem: 'Veículo já cadastrado.' });
        }
        await Veiculo.create({ modelo, placa, ano, cor, usuarioId });
        res.status(201).send({ mensagem: 'Veículo cadastrado com sucesso.' });
    } catch (erroDisparado) {
        console.error(erroDisparado);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
}

const autenticarCarro = async (req, res) => {
    try {
        const { placa } = req.body;
        if (!placa) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const buscarVeiculoPorPlaca = await Veiculo.findOne({ where: { placa } });
        if (!buscarVeiculoPorPlaca) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado.' });
        }
        const conteudoDoToken = { idVeiculo: buscarVeiculoPorPlaca.id };
        const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' });
        return res.status(200).send({ token });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
}

const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll();
        res.status(200).send(veiculos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao listar veículos.' });
    }
};

const excluirVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Veiculo.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado.' });
        }
        res.status(200).send({ mensagem: 'Veículo excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao excluir veículo.' });
    }
};

const atualizarVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelo, placa, ano, cor, usuarioId } = req.body;
        const [updatedRows] = await Veiculo.update({ modelo, placa, ano, cor, usuarioId }, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).send({ mensagem: 'Veículo não encontrado ou nenhuma alteração foi feita.' });
        }
        res.status(200).send({ mensagem: 'Veículo atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensagem: 'Erro ao atualizar veículo.' });
    }
};

export { registrarVeiculo, autenticarCarro, listarVeiculos, excluirVeiculo, atualizarVeiculo };