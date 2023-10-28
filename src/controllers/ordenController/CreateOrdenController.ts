
import { Request, Response, response } from 'express';
import CreateOrderServices from '../../services/order/CreateOrderServices';

class OrderController {

  async createOrder(req: Request, res: Response){
    try{

      const {status,total,addressId,userId} = req.body
      // verificar se não a nem um parametro faltando 
      const order = await CreateOrderServices.createOrder({
				status,
				total,
				addressId,
				userId
      });
      
      res.status(201).json(order)

    }catch(error){
      console.log(error)
    }
  }
}
export default new OrderController();


