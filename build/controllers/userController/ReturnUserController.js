"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnUserServices_1 = __importDefault(require("../../services/userServers/ReturnUserServices"));
class ReturnUserController {
    async return(req, res) {
        const { userId } = req.params;
        try {
            const dataUser = await ReturnUserServices_1.default.getUSer({ userId });
            res.json(dataUser);
        }
        catch (e) {
            res.status(401);
            console.log(e);
        }
    }
}
exports.default = new ReturnUserController();
