import Joi from 'joi';

interface IValidatorParams {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
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
	
	static validarSupllier(usuario: IValidatorParams) {
    const schema = Joi.object({
      nome: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().max(100).required(),
			senha: Joi.string().min(6).max(50).required(),
			telefone: Joi.string().pattern(/^\d{11}$/).required(),
    });
    return schema.validate(usuario);
  }


}

export default Validator;
