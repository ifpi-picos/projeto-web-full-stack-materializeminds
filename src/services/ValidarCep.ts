import axios from 'axios';

interface IParamsEndereco {
	rua:string;
  cidade:string;
  estado:string;
  cep:string;
}

class ValidarCep{
	async getAddressInfo({rua,cidade,estado,cep}:IParamsEndereco){
		try{		
			const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    	const endereco = response.data
			
			
			if(endereco){
				let {bairro,localidade,uf} = endereco
				
				//Ver uma maneira mais sofisticada de fazer isso
				bairro = bairro.toLowerCase()
				localidade = localidade.toLowerCase()
				uf = uf.toLowerCase()

				rua = rua.toLowerCase()
				cidade = cidade.toLowerCase()
				estado = estado.toLowerCase()
				//
				if(rua===bairro && cidade===localidade && estado===uf){
					return true
				}
				return false
			}
			return false
		
		}catch(error){
			return error
		}		
	}
}

export default new ValidarCep()