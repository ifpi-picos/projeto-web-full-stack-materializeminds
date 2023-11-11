"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnSupllierServices_1 = __importDefault(require("../../services/supllierServices/ReturnSupllierServices"));
class ReturnSupllierController {
    async getSupllier(req, res) {
        try {
            const { suplierId } = req.params;
            const suplier = ReturnSupllierServices_1.default.getSupllier({ suplierId });
            res.status(201).json(suplier);
        }
        catch (e) {
            console.log(e);
            res.status(401);
        }
    }
}
exports.default = new ReturnSupllierController();
