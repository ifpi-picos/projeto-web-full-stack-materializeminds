import { prisma } from "../../../lib/prisma";

interface IBodyOrdemItem{
  quantidade: number,
  precoUnitario: number,
  total: number,
  orderId:string,
  productId:string,
}

class OrderItemServices {
  async createOrderIten({quantidade, precoUnitario,total,orderId,productId}:IBodyOrdemItem) {
    
		const orderAlreadyExits = prisma.order.findFirst({
			where:{
				id:orderId
			}
		})

		if(!orderAlreadyExits){
			return new Error("Pedido não existe")
		}

    const productAlreadyExits = prisma.product.findFirst({
			where:{
				id:productId
			}
		})

    if(!productAlreadyExits){
			return new Error("Produto não existe")
		}
    
    const newOrderItem = await prisma.orderItem.create({
      data: {
        quantidade,
				precoUnitario,
				total,
				orderId,  
				productId
      },
    });
  
    await prisma.order.update({
      where: { id: orderId },
      data: {
        orderItems: {
          connect: { id: newOrderItem.id },
        },
      },
    });
    
    return newOrderItem
  }
}

export default new OrderItemServices();
