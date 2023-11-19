import dayjs from "dayjs"
import { prisma } from "../../../lib/prisma"
import GenerateTokenProvider from "../../../services/GenerateTokenProvider"
import GenerateRefreshToken from "../../../services/GenerateRefreshToken"

class RefreshTokenSupllierServices{

	async execute(supllierId:string){
		const refreshToken =  await prisma.refreshTokenSupllier.findFirst({
			where:{
				supllierId:supllierId
			}
		})

		if(!refreshToken){
			throw new Error("Refresh token invalid")
		}
		
		const refreshTokenExpired = dayjs.isDayjs(dayjs.unix(refreshToken.expiresIn))
		const token = await GenerateTokenProvider.execute(refreshToken.supllierId)
		
		
		if(!refreshTokenExpired){ // Fazer um melhor entendimento
			await prisma.refreshTokenSupllier.deleteMany({
				where:{
					supllierId:refreshToken.supllierId
				}
			})

			const newRefreshToken = await GenerateRefreshToken.refreshTokenSupllier(refreshToken.supllierId)

			return { token,newRefreshToken}
		}

		return { token }
	}
}

export default new RefreshTokenSupllierServices() 