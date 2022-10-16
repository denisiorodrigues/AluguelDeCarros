import { Request, Response } from "express"
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(request : Request, response : Response, next : NextFunction) {
    const authHEader = request.headers.authorization;

    if(!authHEader) {
        throw new Error("Token missing"); 
    }

    const [, token] = authHEader.split(" ");

    try {
        const { sub: user_id }  = verify(token, "ccafd93b1f11c4a3b5666200031e9aac") as IPayLoad;
        
        const userRepository = new UsersRepository();

        const user = await userRepository.findById(user_id);
        
        if(!user) {
            throw new Error("User does not exists!")
        }

        next();
    } catch {
        throw new Error("Invalid token")
    }
}