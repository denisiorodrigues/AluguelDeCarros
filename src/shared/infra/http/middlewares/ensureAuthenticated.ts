import { Request, Response } from "express"
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppErros } from "@shared/errors/AppErrors";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(request : Request, response : Response, next : NextFunction) {
    const authHEader = request.headers.authorization;

    if(!authHEader) {
        throw new AppErros("Token missing", 401); 
    }

    const [, token] = authHEader.split(" ");

    try {
        const { sub: user_id }  = verify(token, "ccafd93b1f11c4a3b5666200031e9aac") as IPayLoad;
        
        const userRepository = new UsersRepository();

        const user = await userRepository.findById(user_id);
        
        if(!user) {
            throw new AppErros("User does not exists!", 401); 
        }

        request.user = {
            id: user_id,
        }
        
        next();
    } catch {
        throw new AppErros("Invalid token", 401);
    }
}