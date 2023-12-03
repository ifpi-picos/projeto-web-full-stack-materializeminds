import { error } from "console";
import { prisma } from "../../../lib/prisma";


interface IRequest {
	status: string,
	total: number,
	userId:string,
}

class CreateCartServices {
  async createCartProduct({status, total, userId}:IRequest) {
	
		const userAlreadyExists = await prisma.user.findUnique({
			where:{
				id:userId
			},
			include:{cart:true}
		})

		if(!userAlreadyExists){
			throw new Error('Usuário não existe')
		}
		
		if(userAlreadyExists?.cart){
			return userAlreadyExists.cart
		}

		const newCart = await prisma.cart.create({
			data: {
				status,
				total: 0,
				userId: userId,
			},
		});

		await prisma.user.update({
			where: { id: userId },
			data: {
				cart: {
					connect: { id: newCart.id },
				},
			},
		});
		return newCart;
	}

}

export default new CreateCartServices()