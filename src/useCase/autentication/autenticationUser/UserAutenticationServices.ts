import { compare } from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import GenerateRefreshToken from "../../../services/GenerateRefreshToken"
import GenerateTokenProvider from "../../../services/GenerateTokenProvider"


interface IRequest{
	email:string,
	senha:string

}

class UserAutenticationServices{
	async createAtentication({email,senha}:IRequest){

		const userAlreadyExists = await prisma.user.findFirst({
			where:{
				email
			}
		})

		if(!userAlreadyExists){
			throw new Error(" User or password incorrect!")

		}
		
		const passwordMatch = await compare(senha,userAlreadyExists.senha)

		if(!passwordMatch){
			throw  new Error(" User or password incorrect!")
		}

		const userId = userAlreadyExists.id

		const token = await GenerateTokenProvider.execute(userAlreadyExists.id)
		
		await prisma.refreshToken.deleteMany({
			where:{
				userId:userAlreadyExists.id
			}	
		})

		const refreshToken = await GenerateRefreshToken.execute(userAlreadyExists.id)
		
		return {token,refreshToken,userId}
	}
	
}

export default new UserAutenticationServices()