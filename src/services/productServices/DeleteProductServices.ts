import { prisma } from "../../lib/prisma";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface IParamsProduct{
	id:string
}

class DeleteProductServices{
	delete({id}:IParamsProduct){
		const storage = getStorage();
		




	}

}

export default new DeleteProductServices()