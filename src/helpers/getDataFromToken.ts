import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface Token{
    id: String,
    username: String,
    email: String
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as Token;

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}