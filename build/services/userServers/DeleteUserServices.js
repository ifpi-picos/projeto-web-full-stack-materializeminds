"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class DeleteUserServices {
    async deleteUser({ userId }) {
        const deletedUser = await prisma_1.prisma.user.delete({
            where: {
                id: userId
            },
        });
    }
}
exports.default = new DeleteUserServices();
