import { prisma } from "../../lib/prisma";


class CartServices {
  async createCartProduct(status: string, total: number, userId:string) {
    return prisma.cart.create({
      data: {
        status,
				total,
				userId
      },
    });
  }

	async addCartUser(cartId:string, userId:string){
		return prisma.user.update({
			where:{id:userId},
			data:{
				carts:{
					connect:{id:cartId}
				}
			}
		})
	}

	async list(){
		const cart = await prisma.cart.findMany()
		return cart
	}

}

export default new CartServices()