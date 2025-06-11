import { Acesso } from '../models/acesso.js';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const segredoJwt = process.env.JWT_SECRET;

const registrarAcesso = async (req, res) => {
    try {
        const { usuarioId, veiculoId, dataHora } = req.body;
        if (!usuarioId || !veiculoId || !dataHora) {
            return res.status(400).json({ mensagem: 'Dados incompletos.' });
        }
        await Acesso.create({ usuarioId, veiculoId, data_hora: dataHora });
        res.status(201).json({ mensagem: 'Acesso registrado com sucesso.' });
    } catch {
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

const autenticarAcesso = async (req, res) => {
    try {
        const { usuarioId, veiculoId } = req.body;
        if (!usuarioId || !veiculoId) {
            return res.status(400).json({ mensagem: 'Dados incompletos.' });
        }
        const acesso = await Acesso.findOne({ where: { usuarioId, veiculoId } });
        if (!acesso) {
            return res.status(404).json({ mensagem: 'Acesso não encontrado.' });
        }
        const token = jwt.sign({ idAcesso: acesso.id }, segredoJwt, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch {
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

const registrarSaida = async (req, res) => {
    try {
        const { idAcesso } = req.params;
        const acesso = await Acesso.findByPk(idAcesso);
        if (!acesso) {
            return res.status(404).json({ mensagem: 'Acesso não encontrado.' });
        }
        acesso.data_saida = new Date();
        await acesso.save();
        res.status(200).json({ mensagem: 'Saída registrada.' });
    } catch {
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

const listarAcessos = async (req, res) => {
    try {
        const acessos = await Acesso.findAll();
        res.status(200).json(acessos);
    } catch {
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

const listarSaidas = async (req, res) => {
    try {
        // Certifique-se de que Acesso também está importado/definido
        const acessos = await Acesso.findAll({ where: { data_saida: { [Op.ne]: null } } });
        if (!acessos.length) {
            // Um 200 OK com array vazio ou mensagem de "não encontrado" é melhor aqui
            // do que um 404, pois a rota foi encontrada, mas não há dados.
            return res.status(200).json([]); // Retorna array vazio em vez de 404
        }
        res.status(200).json(acessos);
    } catch (error) { // Adicione 'error' para logar o erro real
        console.error('Erro no listarSaidas:', error); // Log do erro para depuração
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

const contarPresentes = async (req, res) => {
    try {
        const totalPresentes = await Acesso.count({ where: { data_saida: { [Op.is]: null } } });
        res.status(200).json({ totalPresentes });
    } catch {
        res.status(500).json({ mensagem: 'Erro inesperado.' });
    }
};

export {
    registrarAcesso,
    autenticarAcesso,
    registrarSaida,
    listarAcessos,
    listarSaidas,
    contarPresentes
};
