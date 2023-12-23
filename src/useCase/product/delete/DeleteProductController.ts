import { Request,Response } from "express"
import DeleteProductServices from "./DeleteProductServices"


class DeleteProductController{

	async deleteUnique(req:Request,res:Response){
		
		const {productId} = req.params

		try{
			const deletedProduct = await DeleteProductServices.deleteUniqueProduct({productId})

			// const menssage = `O produto ${(deletedProduct).nomeDoProduto} foi deletado`
			
			res.status(200)//.json(menssage)

		}catch(error){
			console.log(error)
			res.status(200).json("Erro ao deletar o produto")
		}

	}


}

export default new DeleteProductController