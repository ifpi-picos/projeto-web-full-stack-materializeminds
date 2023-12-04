import { Request,Response } from "express"
import listProductServices from "./ListProductServices"

class ReturnProductController{
	
	async findMany(req:Request, res:Response){
		
		try{
			const products = await listProductServices.listProducts()
			return res.status(200).json(products)

		}catch(error){
			console.log(error)
			res.status(400).json({error:"Não foi possivel retorna os produtos."})
		}
	}

	async findUnique(req:Request, res:Response){
		
		const {productId} = req.params

		try{
			const product = await listProductServices.listUniqueProduct({productId})
			return res.status(200).json(product)

		}catch(error){
			console.log(error)
			res.status(400).json({error:"Produto não foi encontrado !"})
		}
	}

	async findCategoryProducts(req:Request, res:Response){
		
		const {categoria} = req.params
		
		try{
			const products = await listProductServices.listCategoryProducts({categoria})
			return res.status(200).json(products)

		}catch(error){
			
			console.log(error)
			res.status(400).json({error:"Não foi possivel retorna os produtos."})
		}
	}

	async searchProducts(req:Request, res:Response){
		const {searchTerm} = req.params
		
		try{
			const products = await listProductServices.searchProductsServices(searchTerm)

			res.status(201).json(products)

		}catch(error){
			console.log(error)
			res.status(400).json({error:"Não foi possivel retorna os produtos."})
		}
	}
}

export default new ReturnProductController()