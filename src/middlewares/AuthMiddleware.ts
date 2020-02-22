import * as jwt from "jsonwebtoken";
import * as authConfig from "../../config/auth.json";
import { ResponseBuilder } from "../common/ResponseBuilder";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send(new ResponseBuilder(false, "Nenhum token informado"));
  }

  const parts = authHeader.split(" ");

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send(new ResponseBuilder(false, "Token em formato inválido"));
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(new ResponseBuilder(false, "Token inválido"));
    }

    req.userId = decoded.id;
    return next();
  });
};
