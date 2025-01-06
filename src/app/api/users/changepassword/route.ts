import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, newpassword} = reqBody;
        console.log(newpassword);

        const userEmail = email.split("%40")[0] + "@" + email.split("%40")[1];

        const user = await User.findOne({email: userEmail});

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        if(!user.isVerified) {
            return NextResponse.json({error: "User is not verified"}, {status: 400});
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, salt);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            {message: "Password changed successfully",
            success: true
        }, {status: 200});

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
