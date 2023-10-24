import { Request, Response } from 'express';
import SupplierService from '../../services/supllierServices/SupllierServices';


class SupplierController {
  async createSupplier(req: Request, res: Response) {
    try {
      const { nomeDaEmpresa, endereco, contato, email, senha} = req.body;
      const supplier = await SupplierService.createSupplier({nomeDaEmpresa, endereco, contato, email,senha});
      res.status(201).json(supplier);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao criar o fornecedor' });
    }
  }

  async list(req: Request, res: Response){
    const supplier = await SupplierService.list()
    res.json(supplier)
  }

}

export default new SupplierController();
