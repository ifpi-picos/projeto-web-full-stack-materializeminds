import { compare } from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"


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
			throw new Error(" User or password incorrect!")

		}
		
		const passwordMatch = await compare(senha,supllierAlreadyExists.senha)

		if(!passwordMatch){
			throw  new Error(" User or password incorrect!")
		}

		const userId = supllierAlreadyExists.id
		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(supllierAlreadyExists.id)
		
		await prisma.refreshTokenSupllier.deleteMany({
			where:{
				supllierId:supllierAlreadyExists.id
			}
		})

		const generateRefreshToken = new GenerateRefreshToken()
		const refreshToken = await generateRefreshToken.refreshTokenSupllier(supllierAlreadyExists.id)
		
		return {token,refreshToken,userId}
	}
	
}

export default new SupllierAutenticationServices()