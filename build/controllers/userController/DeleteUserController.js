"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteUserServices_1 = __importDefault(require("../../services/userServers/DeleteUserServices"));
class DeleteUserController {
    async delete(req, res) {
        const { userId } = req.params;
        try {
            const user = DeleteUserServices_1.default.deleteUser({ userId });
            res.send(user);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = new DeleteUserController();
