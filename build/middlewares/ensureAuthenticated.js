"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(resquest, response, next) {
    const authToken = resquest.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            message: "token is missing"
        });
    }
    const [, token] = authToken.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, "98b2579d-3686-4993-9097-685f0ebb6aaa");
        return next();
    }
    catch (error) {
        return response.status(401).json({
            message: "token invalido"
        });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
