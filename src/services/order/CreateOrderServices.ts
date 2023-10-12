

interface IOrderRequest{
	id:String    
  dataDoPedido: Date
  status:String
  total: Number
  enderecoDeEntrega:String
  userId: String
}

class CreateOrderServices {
	async createOrder(){

	}

}
export default new CreateOrderServices()
