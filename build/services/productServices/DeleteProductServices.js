"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
const admin = __importStar(require("firebase-admin"));
class DeleteProductServices {
    async deleteUniqueProduct({ productId }) {
        const product = await prisma_1.prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            new Error("Produto não existe");
        }
        const fileUrl = product?.imageUrl;
        if (fileUrl && typeof fileUrl === 'string' && fileUrl.trim() !== '') {
            const filePathAndNameWithQuery = fileUrl.split('/o/')[1];
            const filePathAndName = filePathAndNameWithQuery.split('?')[0];
            console.log(filePathAndName);
            const storage = admin.storage();
            const fileRef = storage.bucket().file(filePathAndName);
            fileRef.delete()
                .then(() => {
                console.log('Arquivo excluído com sucesso.');
            })
                .catch((error) => {
                console.error('Erro ao excluir o arquivo:', error);
            });
        }
        const deletedProduct = prisma_1.prisma.product.delete({
            where: {
                id: productId
            }
        });
        return deletedProduct;
    }
}
exports.default = new DeleteProductServices();
