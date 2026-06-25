import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Status } from "@prisma/client";
import { UserMapper } from "src/modules/users/mappers/user.mapper";

@Injectable()
export class AuthTokenFactory {
    constructor(
        private readonly jwtSevice: JwtService
    ){}
    async createAccessTokenPayload(user: {
        id:number;
        email:string;
        role:string;
    }){
        return {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: "access"
        }
    }

    async createRefreshTokenPayload(user: {
        id:number;
        email:string;
        role:string;
    }){
        return {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: "refresh"
        }
    }

    async createRefreshToken(user: {
        id: number;
        email: string;
        role: string;
    }){
        const payload = await this.createRefreshTokenPayload(user);
        return await this.jwtSevice.signAsync(payload, {
            expiresIn: "7d"
        });
    }
    async createAccessToken(user: {
        id: number;
        email: string;
        role: string;
    }){
        const payload = await this.createAccessTokenPayload(user)
        return await this.jwtSevice.signAsync(payload, {
            expiresIn: "1h"
        })
    }
    async createLoginResponse(user: {
        id: number;
        email: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }){
        const accessToken = await this.createAccessToken(user);
        const refreshToken = await this.createRefreshToken(user);
        const userResponse = UserMapper.toResponse(user);
        return {
            user: userResponse,
            accessToken,
            refreshToken
        }
    }
}