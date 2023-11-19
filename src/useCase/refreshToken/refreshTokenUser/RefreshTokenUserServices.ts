import dayjs from "dayjs"
import { prisma } from "../../../lib/prisma"
import GenerateTokenProvider from "../../../services/GenerateTokenProvider"
import GenerateRefreshToken from "../../../services/GenerateRefreshToken"

class RefreshTokenUserServices{

	async execute(userId:string){
		const refreshToken =  await prisma.refreshToken.findFirst({
			where:{
				userId:userId
			}
		})
		console.log(refreshToken)
		if(!refreshToken){
			throw new Error("Refresh token invalid")
		}
		
		const refreshTokenExpired = dayjs.isDayjs(dayjs.unix(refreshToken.expiresIn))

		const token = await GenerateTokenProvider.execute(refreshToken.userId)
		
		if(!refreshTokenExpired){ // Fazer um melhor entendimento
			await prisma.refreshToken.deleteMany({
				where:{
					userId:refreshToken.userId
				}
			})
			const newRefreshToken = await GenerateRefreshToken.execute(refreshToken.userId)

			return { token,newRefreshToken}
		}

		return { token }
	}
}

export default new RefreshTokenUserServices() 