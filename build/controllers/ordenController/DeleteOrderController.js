"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteOrderServices_1 = __importDefault(require("../../services/order/DeleteOrderServices"));
class DeleteOrderController {
    async deleteOrder(req, res) {
        const { orderId } = req.body;
        try {
            DeleteOrderServices_1.default.deleteOrder(orderId);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = new DeleteOrderController;
