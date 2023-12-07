import { prisma } from "../../../lib/prisma";


interface ICardRequest{
	userId: string
}


class ReturnCartServices {
	async getCard({userId}:ICardRequest){

		const cart = await prisma.cart.findFirst({
			where: {
				userId: userId
			},
			include: {
				cartItems: {
					include: {
						product: true
					}
				}
			}
		});
		
		return cart;
	}
}

export default new ReturnCartServices()