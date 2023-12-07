import { prisma } from "../../../lib/prisma"
import returnCartServices from "../return/returnCartServices";

interface IUpdateCart{
	cartId:string

}

class UpdateCartServices{
	async UpdateCartServices({cartId}:IUpdateCart){

		const cart = await prisma.cart.findUnique({
			where: {
				id: cartId,
			},
			include: {
				cartItems: {
					include: {
						product: true,
					},
				},
			},
		});
	
		if (!cart) {
			throw new Error('Carrinho de compras não existe')
		}
	
		// Calcular o novo total do carrinho
		const newTotal = cart.cartItems.reduce((total, cartItem) => {
			return total + cartItem.product.preco * cartItem.quantity;
		}, 0);
	
		// Atualizar o total do carrinho no banco de dados
		const updatedCart = await prisma.cart.update({
			where: {
				id: cartId,
			},
			data: {
				total: newTotal,
			},
			include:{
				cartItems:{
					include: {
						product: true
					}
				}
			}
		});
		
		console.log(updatedCart)
			
		return updatedCart;
	}
}

export default new UpdateCartServices()