import { sign } from "jsonwebtoken"

class GenerateTokenProvider{

	async execute(userId:string){
		const keyToken = process.env.KEY_TOKEN

		if(keyToken != null){
			const token = sign({}, keyToken,{
				subject: userId,
				expiresIn: "60s"
			})
			return token
		}
	}	
}

export { GenerateTokenProvider }