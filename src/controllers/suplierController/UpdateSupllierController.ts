import { Request, Response } from 'express';
import UpdateSupllierServices from '../../services/supllierServices/UpdateSupllierServices';

class UpdateSupplierController {
  async createSupplier(req: Request, res: Response) {
    try {
      const { nomeDaEmpresa, endereco, contato, email, senha} = req.body;
      const supplier = await UpdateSupllierServices.createSupplier({nomeDaEmpresa, endereco, contato, email,senha});
      res.status(201).json(supplier);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao criar o fornecedor' });
    }
  }
}

export default new UpdateSupplierController();
