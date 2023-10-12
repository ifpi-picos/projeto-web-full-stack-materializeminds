import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(resquest:Request,response:Response,next:NextFunction){
	const authToken = resquest.headers.authorization

	if(!authToken){
		return response.status(401).json({
			message:"token is missing"
		})
	}

	const [ ,token] = authToken.split(" ")

	try{
		verify(token,"98b2579d-3686-4993-9097-685f0ebb6aaa")
		return next()
	}catch(error){
		return response.status(401).json({
			message:"token invalido"
		})
	}


}