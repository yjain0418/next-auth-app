import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class Error {
    name!: string;
    message!: string;
    stack?: string;
}

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        if(!user.isVerified) {
            return NextResponse.json({error: "User is not verified"}, {status: 400});
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

        if(!isPasswordCorrect) {
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response

    } catch (error: unknown) {
        return NextResponse.json({error : error instanceof Error ? error.message : "Unknown error occured"}, {status: 500});
    }
}