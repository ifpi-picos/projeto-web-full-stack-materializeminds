import { prisma } from "../../../lib/prisma";


interface ICardRequest{
	userId: string
}


class ReturnCartServices {
	async getCard({userId}:ICardRequest){
	
		const cart = await prisma.cart.findMany({
		where:{
			userId:userId
		},
		include:{
			products:true
		}
		
	})
		console.log(cart)
		return cart
	}

}

export default new ReturnCartServices()