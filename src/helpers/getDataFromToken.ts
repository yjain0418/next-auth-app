import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface Token{
    id: string,
    username: string,
    email: string
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as Token;

        return decodedToken.id;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Unknown error occured");
    }
}