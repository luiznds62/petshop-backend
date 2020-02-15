"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Nenhum token informado" });
    }
    const parts = authHeader.split(' ');
    // if (!parts.length === 2) {
    //     return res.status(401).send({ error: "Token com erro" });
    // }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token em formato inválido" });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Token inválido" });
        }
        req.userId = decoded.id;
        return next();
    });
};
