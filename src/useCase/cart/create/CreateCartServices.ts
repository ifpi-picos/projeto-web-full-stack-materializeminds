import { prisma } from "../../../lib/prisma";


interface IRequest {
	status: string,
	total: number,
	userId:string,
	productId:string,
}

class CreateCartServices {
  async createCartProduct({status, total, userId,productId}:IRequest) {
	
		const userAlreadyExists = await prisma.user.findUnique({
			where:{
				id:userId
			},
			include:{cart:true}
		})
		
		if(userAlreadyExists?.cart){
			return userAlreadyExists.cart
		}

		const newCart = await prisma.cart.create({
			data: {
				status,
				total: 0.0,
				userId: userId,
				productId
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
	
	async list(){
	const cart = await prisma.cart.findMany()
		return cart
	}

}

export default new CreateCartServices()