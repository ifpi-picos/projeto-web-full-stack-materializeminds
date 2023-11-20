import dayjs from 'dayjs'

import { prisma } from "../lib/prisma"

class GenerateRefreshToken{
	async execute(userId:string){
		const expiresIn = dayjs().add(7,"days").unix(); 

		const generateRefreshToken = await prisma.refreshToken.create({
			data:{
				userId,
				expiresIn
			}
		})

		return generateRefreshToken
	}

	async refreshTokenSupllier(supllierId:string){
		const expiresIn = dayjs().add(7,"days").unix(); 

		const generateRefreshToken = await prisma.refreshTokenSupllier.create({
			data:{																	
				supllierId,
				expiresIn			
			}
		})

		return generateRefreshToken
	}
}

export default new GenerateRefreshToken()