import dayjs from "dayjs"
import { prisma } from "../../lib/prisma"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

class RefreshTokenUserServices{

	async execute(supllierId:string){
		const refreshToken =  await prisma.refreshToken.findFirst({
			where:{
				userId:supllierId
			}
		})

		if(!refreshToken){
			throw new Error("Refresh token invalid")
		}

		const refreshTokenExpired = dayjs.isDayjs(dayjs.unix(refreshToken.expiresIn))
		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(refreshToken.userId)
		
		if(!refreshTokenExpired){ // Fazer um melhor entendimento
			await prisma.refreshToken.deleteMany({
				where:{
					userId:refreshToken.userId
				}
			})
			const generateRefreshToken = new GenerateRefreshToken()
			const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId)

			return { token,newRefreshToken}
		}

		return { token }
	}
}

export { RefreshTokenUserServices }