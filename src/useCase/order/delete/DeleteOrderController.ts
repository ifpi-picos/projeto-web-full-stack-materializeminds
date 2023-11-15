import { Request, Response} from "express"

import DeleteOrderServices from "./DeleteOrderServices"


class DeleteOrderController{
	
  async deleteOrder(req:Request,res:Response){
    
		const {orderId} = req.body
		
		try{
      DeleteOrderServices.deleteOrder(orderId)
    }catch(e){
      console.log(e)
    }
  }
}

export default new DeleteOrderController