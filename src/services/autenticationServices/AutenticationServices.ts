import { compare } from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"


interface IRequest{
	email:string,
	senha:string

}

class AutenticationServices{
	async createAtentication({email,senha}:IRequest){

		const userAlreadyExists = await prisma.user.findFirst({
			where:{
				email
			}
		})

		if(!userAlreadyExists){
			throw  new Error(" User or password incorrect!")

		}
		
		const passwordMatch = await compare(senha,userAlreadyExists.senha)

		if(!passwordMatch){
			throw  new Error(" User or password incorrect!")
		}

		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(userAlreadyExists.id)
		
		await prisma.refreshToken.deleteMany({
			where:{
				userId:userAlreadyExists.id
			}
		})

		const generateRefreshToken = new GenerateRefreshToken()
		const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)
		
		return {token,refreshToken}
	}
	
}

export default new AutenticationServices()