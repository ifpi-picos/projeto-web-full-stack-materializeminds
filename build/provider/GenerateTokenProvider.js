"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenProvider = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateTokenProvider {
    async execute(userId) {
        const keyToken = process.env.KEY_TOKEN;
        if (keyToken != null) {
            const token = (0, jsonwebtoken_1.sign)({}, keyToken, {
                subject: userId,
                expiresIn: "60s"
            });
            return token;
        }
    }
}
exports.GenerateTokenProvider = GenerateTokenProvider;
