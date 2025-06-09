import { Acesso } from '../models/acesso.js';
import jwt from 'jsonwebtoken';

const segredoJwt = process.env.JWT_SECRET;

const registrarAcesso = async (req, res) => {
    try {
        const { usuarioId, veiculoId, dataHora } = req.body;
        if (!usuarioId || !veiculoId || !dataHora) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        await Acesso.create({ usuarioId, veiculoId, data_hora: dataHora });
        res.status(201).send({ mensagem: 'Acesso registrado com sucesso.' });
    } catch (erroDisparado) {
        console.error(erroDisparado);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
};

const autenticarAcesso = async (req, res) => {
    try {
        const { usuarioId, veiculoId } = req.body;
        if (!usuarioId || !veiculoId) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const buscarAcesso = await Acesso.findOne({ where: { usuarioId, veiculoId } });
        if (!buscarAcesso) {
            return res.status(404).send({ mensagem: 'Acesso não encontrado.' });
        }
        const conteudoDoToken = { idAcesso: buscarAcesso.id };
        const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' });
        return res.status(200).send({ token });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
};

export { registrarAcesso, autenticarAcesso };