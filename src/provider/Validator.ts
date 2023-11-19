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

class Validator {
  static validarUsuario(usuario: IValidatorParams) {
    const schema = Joi.object({
      nome: Joi.string().min(2).max(25).required(),
      email: Joi.string().email().required().pattern(/@email\.com$/),
			senha: Joi.string().min(6).max(25).required(),
			telefone: Joi.string().pattern(/^\d{11}$/).required(),
    });
    return schema.validate(usuario);
  }
	
	static validarSupllier(supplier: IValidatorParamsSupllier) {
    const schema = Joi.object({
      nomeDaEmpresa: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().max(100).required(),
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


}

export default Validator;
