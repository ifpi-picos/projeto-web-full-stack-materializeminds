import { Request, Response } from 'express';
import UserService from '../services/userServers/UserServers';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { nome, sobrenome, endereco, email, senha, telefone } = req.body;
      const user = await UserService.createUser(nome, sobrenome, endereco, email, senha, telefone);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  }

  async list(req: Request, res: Response){
    const user = await UserService.list()
    res.json(user)
  }

}

export default new UserController();
