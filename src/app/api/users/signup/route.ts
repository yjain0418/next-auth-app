import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer3';

class Error {
    name!: string;
    message!: string;
    stack?: string;
}

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //validations

        const user = await User.findOne({email});

        if(user) {
            if(user.isVerified) {
                return NextResponse.json({error: "User already exists"}, {status: 400});
            }else {
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);

                user.password= hashedPassword;
                await user.save();
            }
        }else {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
    
            const newUser = new User({
                username, 
                email,
                password: hashedPassword
            });
    
            await newUser.save();
        }

        const savedUser = await User.findOne({email}).select("-password");

        //verification by email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: unknown) {
        return NextResponse.json({error : error instanceof Error ? error.message : "Unknown error occured"}, {status: 500});
    }
}