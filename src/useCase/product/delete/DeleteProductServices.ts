import { prisma } from "../../../lib/prisma";
import * as admin from 'firebase-admin';


interface IParamsProduct{
	productId:string
}

class DeleteProductServices{
	async deleteUniqueProduct({productId}:IParamsProduct){
		
		const product = await prisma.product.findUnique({
			where:{
				id:productId
			}
		})
		console.log(product)
		if(!product){
			new Error("Produto não existe")
		}
		
		const fileUrl  = product?.imageUrl
		console.log(fileUrl)
		if (fileUrl && typeof fileUrl === 'string' && fileUrl.trim() !== ''){

			const filePathAndNameWithQuery = fileUrl.split('/o/')[1];
    	const filePathAndName = filePathAndNameWithQuery.split('?')[0];
    	console.log(filePathAndName)

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

		const deletedProduct = await prisma.product.delete({
			where:{
				id:productId
			}
		})

		return deletedProduct
	}
}

export default new DeleteProductServices()