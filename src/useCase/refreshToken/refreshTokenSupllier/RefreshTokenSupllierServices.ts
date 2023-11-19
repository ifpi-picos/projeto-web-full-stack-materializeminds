import dayjs from "dayjs"
import { prisma } from "../../../lib/prisma"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken"

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
		const generateTokenProvider = new GenerateTokenProvider()
		const token = await generateTokenProvider.execute(refreshToken.supllierId)
		
		if(!refreshTokenExpired){ // Fazer um melhor entendimento
			await prisma.refreshTokenSupllier.deleteMany({
				where:{
					supllierId:refreshToken.supllierId
				}
			})
			const generateRefreshToken = new GenerateRefreshToken()
			const newRefreshToken = await generateRefreshToken.refreshTokenSupllier(refreshToken.supllierId)

			return { token,newRefreshToken}
		}

		return { token }
	}
}

export default new RefreshTokenSupllierServices() 