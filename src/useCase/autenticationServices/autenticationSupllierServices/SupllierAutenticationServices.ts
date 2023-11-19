import { compare } from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import GenerateRefreshToken from "../../../services/GenerateRefreshToken"
import GenerateTokenProvider from "../../../services/GenerateTokenProvider"


interface IRequest{
	email:string,
	senha:string

}

class SupllierAutenticationServices{
	async createAtentication({email,senha}:IRequest){

		const supllierAlreadyExists = await prisma.supplier.findFirst({
			where:{
				email
			}
		})

		if(!supllierAlreadyExists){
			throw new Error("User or password incorrect!")
		}
		
		const passwordMatch = await compare(senha,supllierAlreadyExists.senha)

		if(!passwordMatch){
			throw  new Error("User or password incorrect!")
		}

		const supllierId = supllierAlreadyExists.id
		const token = await GenerateTokenProvider.execute(supllierAlreadyExists.id)
		
		await prisma.refreshTokenSupllier.deleteMany({
			where:{
				supllierId:supllierAlreadyExists.id
			}
		})

		const refreshToken = await GenerateRefreshToken.refreshTokenSupllier(supllierAlreadyExists.id)
		
		return {token,refreshToken,supllierId}
	}
	
}

export default new SupllierAutenticationServices()