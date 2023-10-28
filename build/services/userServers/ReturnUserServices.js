"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ReturnUserServices {
    async getUSer({ email }) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: email
            }
        });
        return user;
    }
}
exports.default = new ReturnUserServices();
