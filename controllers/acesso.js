import { Acesso } from '../models/acesso.js';
import { Veiculo } from '../models/veiculo.js';
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
        const acessos = await Acesso.findAll({
            include: [{
                model: Veiculo,
                attributes: ['placa']
            }]
        });
        res.json(acessos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar acessos.' });
    }
};

const listarSaidas = async (req, res) => {
    try {
        const acessos = await Acesso.findAll({ where: { data_saida: { [Op.ne]: null } } });
        if (!acessos.length) {
            return res.status(200).json([]);
        }
        res.status(200).json(acessos);
    } catch (error) {
        console.error('Erro no listarSaidas:', error);
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
