import { prisma } from "../../lib/prisma";

class SupplierService {
  async createSupplier(nomeDaEmpresa: string, endereco: string, contato: string, email: string) {
    return prisma.supplier.create({
      data: {
        nomeDaEmpresa,
        endereco,
        contato,
        email,
      },
    });
  }
  
  async list(){
		const supplier = await prisma.supplier.findMany({
      include:{
        products:true
      }
    })
		return supplier
	}
}

export default new SupplierService();
