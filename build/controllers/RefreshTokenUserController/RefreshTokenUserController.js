"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUserController = void 0;
const RefreshTokenUserServices_1 = require("../../services/refreshTokenUser/RefreshTokenUserServices");
class RefreshTokenUserController {
    async handle(request, response) {
        const { userId } = request.body;
        const refreshTokenUserServices = new RefreshTokenUserServices_1.RefreshTokenUserServices();
        const token = await refreshTokenUserServices.execute(userId);
        return response.json(token);
    }
}
exports.RefreshTokenUserController = RefreshTokenUserController;
