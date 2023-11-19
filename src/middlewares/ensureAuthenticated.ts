import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(resquest:Request,response:Response,next:NextFunction){
	
	const authToken = resquest.headers.authorization
	const keyToken = process.env.KEY_TOKEN
	
	if(!authToken){
		return response.status(401).json({
			message:"token is missing"
		})
	}

	const [ ,token] = authToken.split(" ")

	try{
		if(keyToken){
			verify(token,keyToken)
			return next()
		}
			
	}catch(error){	
		return response.status(401).json({
			message:"token invalido"
		})
	}
}