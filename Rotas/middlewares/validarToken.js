import jwt from 'jsonwebtoken';

const segredoJwt = process.env.JWT_SECRET;

const validarToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({ mensagem: 'Acesso negado: Token ausente.' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({ mensagem: 'Acesso negado: Token ausente.' });
        }

        const conteudoDoToken = jwt.verify(token, segredoJwt);
        req.id_usuario = conteudoDoToken.idUsuario;
        next();
    } catch (erro) {
        console.error(erro);
        if (erro.name === 'JsonWebTokenError') {
            return res.status(401).send({ mensagem: 'Acesso negado: Token inválido.' });
        }
        if (erro.name === 'TokenExpiredError') {
            return res.status(401).send({ mensagem: 'Acesso negado: Token expirado.' });
        }
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado durante a validação do token.' });
    }
};

export { validarToken };