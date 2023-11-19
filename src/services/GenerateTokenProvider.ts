import { sign } from "jsonwebtoken"

class GenerateTokenProvider{

	async execute(id:string){
		const keyToken = process.env.KEY_TOKEN

		if(keyToken != null){
			const token = sign({}, keyToken,{
				subject: id,
				expiresIn: "60s"
			})
			return token
		}
	}
}

export default new GenerateTokenProvider()