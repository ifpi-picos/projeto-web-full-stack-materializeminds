import Joi from 'joi';

interface IValidatorParams {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

interface IValidatorParamsSupllier{
  nomeDaEmpresa: string;
  email: string;
  senha: string;
  contato: string;
}

interface IValidatorParamsEndereco{
  rua:string;
  cidade:string;
  estado:string;
  cep:string;
}
interface IValidatorParamsProduct{
  nomeDoProduto:string;
  descricao:string;
  preco:number;
  estoque:number
  categoria:string
  supplierId:string;
}



class Validator {
  static validarUsuario(usuario: IValidatorParams) {
    const schema = Joi.object({
      nome: Joi.string().min(2).max(25).required(),
      email: Joi.string().email().required().pattern(/@gmail\.com$/),
			senha: Joi.string().min(6).max(25).required(),
			telefone: Joi.string().pattern(/^\d{11}$/).required(),
    });
    return schema.validate(usuario);
  }
	
	static validarSupllier(supplier: IValidatorParamsSupllier) {
    const schema = Joi.object({
      nomeDaEmpresa: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().max(50).required().pattern(/@gmail\.com$/),
			senha: Joi.string().min(6).max(50).required(),
			contato: Joi.string().pattern(/^\d{11}$/).required(),
    });
    return schema.validate(supplier);
  }
  
  static validarEndereco(endereco: IValidatorParamsEndereco) {
    const schema = Joi.object({
      rua: Joi.string().min(2).max(30).required(),
      cidade: Joi.string().min(2).max(30).required(),
      estado: Joi.string().min(2).max(2).required(),
      cep: Joi.string().min(8).max(30).required(),
      })

    return schema.validate(endereco);
  }

  static validarProduct(endereco: IValidatorParamsProduct) {
    const schema = Joi.object({
      nomeDoProduto:Joi.string().min(2).max(30).required(),
      descricao:Joi.string().max(30).required(),
      preco:Joi.number().max(100000).required(),
      estoque:Joi.number().min(1).max(30).required(),
      categoria:Joi.string().min(4).max(30).required(),
      supplierId:Joi.string().min(36).max(36).required(),

      })

    return schema.validate(endereco);
  }




}

export default Validator;
