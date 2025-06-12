import { Usuario } from "../models/usuario.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const segredoJwt = process.env.JWT_SECRET;

const registrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, documento } = req.body;
        if (!nome || !email || !senha || !documento) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).send({ mensagem: 'Usuário já existe.' });
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        await Usuario.create({ nome, email, senha: hashedPassword, documento });
        res.status(201).send({ mensagem: 'Usuário criado com sucesso.' });
    } catch (erroDisparado) {
        console.error(erroDisparado);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
};

const autenticarUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).send({ mensagem: 'Dados incompletos.' });
        }
        const buscarUsuarioPorEmail = await Usuario.findOne({ where: { email } });
        if (!buscarUsuarioPorEmail) {
            return res.status(404).send({ mensagem: 'Usuário não encontrado.' });
        }
        const senhaValida = await bcrypt.compare(senha, buscarUsuarioPorEmail.senha);
        if (senhaValida) {
            const conteudoDoToken = { idUsuario: buscarUsuarioPorEmail.id };
            const token = jwt.sign(conteudoDoToken, segredoJwt, { expiresIn: '1d' });
            return res.status(200).send({ token });
        } else {
            return res.status(401).send({ mensagem: 'Credenciais inválidas.' });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado.' });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
    }
};

export { registrarUsuario, autenticarUsuario, listarUsuarios };
