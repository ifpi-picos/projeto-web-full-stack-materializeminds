export function errorHandling(error:any){
	const passwordError = '"senha" length must be at least 6 characters long'
	const phoneError = '"telefone" with value "1" fails to match the required pattern: /^\\d{11}$/'
	
	if(error.message.includes(passwordError)){
		return 'Campos invalidos: A senha deve conter entre 6 a 25 caracteres'
	}
	else if(error.message.includes(phoneError)){
		return 'Campos Invalidos: O telefone tem que ter 11 digitos'
	}
	

	return error.message
}