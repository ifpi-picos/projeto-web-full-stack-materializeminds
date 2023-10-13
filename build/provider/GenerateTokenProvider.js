"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenProvider = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateTokenProvider {
    async execute(userId) {
        const token = (0, jsonwebtoken_1.sign)({}, "98b2579d-3686-4993-9097-685f0ebb6aaa", {
            subject: userId,
            expiresIn: "60s"
        });
        return token;
    }
}
exports.GenerateTokenProvider = GenerateTokenProvider;
