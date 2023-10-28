import { prisma } from "../../lib/prisma"


interface IOrderBody{  
  status:string
  total: number
  addressId:string
  userId: string
}

class CreateOrderServices {
	async createOrder({status,total,addressId,userId}:IOrderBody){

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const ordem = await prisma.order.create({
      data:{
        dataDoPedido: new Date(),
        status,
        total,
        addressId,
        userId
      }
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        orders: {
          connect: { id: ordem.id },
        },
      },
    })
     return ordem
	}
  dele(){
    prisma.order.deleteMany({})
  }
}

export default new CreateOrderServices()
