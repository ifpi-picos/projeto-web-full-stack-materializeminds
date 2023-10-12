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
}

export { GenerateRefreshToken }