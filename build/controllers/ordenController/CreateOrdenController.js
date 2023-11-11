"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateOrderServices_1 = __importDefault(require("../../services/order/CreateOrderServices"));
class OrderController {
    async createOrder(req, res) {
        try {
            const { status, total, addressId, userId } = req.body;
            // verificar se não a nem um parametro faltando 
            const order = await CreateOrderServices_1.default.createOrder({
                status,
                total,
                addressId,
                userId
            });
            res.status(201).json(order);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new OrderController();
