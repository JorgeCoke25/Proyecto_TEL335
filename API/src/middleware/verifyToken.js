const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (ctx, next) => {
    const token = ctx.request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        ctx.status = 401;
        ctx.body = { error: 'Token no proporcionado' };
        return;
    }

    try {
        // Verificar y decodificar el token
        ctx.state.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error: 'Token inválido' };
    }
};

module.exports = verifyToken;
