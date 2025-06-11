// middlewares/validarToken.js
import jwt from 'jsonwebtoken';

export function validarToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authorization.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id_usuario = decoded.id; // isso deve bater com o que foi inserido no token
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
}
