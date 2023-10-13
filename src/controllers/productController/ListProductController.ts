import { Request,Response } from "express"
import listProductServices from "../../services/productServices/ListProductServices"


class ListProductController{
	list(request:Request, response:Response){
		try{

			const listProduct = listProductServices.listProduct()
			return response.status(200).json(listProduct)

		}catch(error){
			response.status(400).json({error:"Não foi possivel listar os produtos, tende novamente !"})
		}
	}
}
export default new ListProductController()