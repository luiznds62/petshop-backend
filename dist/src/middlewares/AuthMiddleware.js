"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .send(new ResponseBuilder_1.ResponseBuilder(false, "Nenhum token informado"));
    }
    const parts = authHeader.split(" ");
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res
            .status(401)
            .send(new ResponseBuilder_1.ResponseBuilder(false, "Token em formato inválido"));
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send(new ResponseBuilder_1.ResponseBuilder(false, "Token inválido"));
        }
        req.userId = decoded.id;
        return next();
    });
};
//# sourceMappingURL=AuthMiddleware.js.map