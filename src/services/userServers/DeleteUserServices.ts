import { prisma } from "../../lib/prisma";

interface IUserParams{
	userId: string
}

class DeleteUserServices{
	async deleteUser({userId}:IUserParams){

		const deletedUser = await prisma.user.delete({
      where: {
        id: userId
			},
		})
	}
	async deleteAll(){
		const deletedUser = await prisma.user.deleteMany({})
	}
}
export default new DeleteUserServices()

