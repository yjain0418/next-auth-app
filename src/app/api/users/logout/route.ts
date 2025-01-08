import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

class Error {
    name!: string;
    message!: string;
    stack?: string;
}

connect()

export async function GET(request: NextRequest) {
    try {
        console.log(request)

        const response = NextResponse.json({
            message: "Logged out Success",
            success: true
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error : unknown) {
        return NextResponse.json({error : error instanceof Error ? error.message : "Unknown error occured"}, {status: 500});
    }
}