import { sign } from "jsonwebtoken"

class GenerateTokenProvider{

	async execute(userId:string){
		const token = sign({}, "98b2579d-3686-4993-9097-685f0ebb6aaa",{
			subject: userId,
			expiresIn: "60s"
		})
		return token
	}	

}

export { GenerateTokenProvider }