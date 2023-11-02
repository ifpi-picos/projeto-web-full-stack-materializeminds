import { prisma } from "../../lib/prisma";

class DeleteUserServices{
	async deleteUser(){

		const deletedUser = await prisma.user.delete({
      where: {
        id: "88e2fd34-d137-4a66-9ef9-1fd20e4733fa"
			},
		})
	}

}
export default new DeleteUserServices()

