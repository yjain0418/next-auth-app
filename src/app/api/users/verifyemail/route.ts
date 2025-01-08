import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

class Error {
    name!: string;
    message!: string;
    stack?: string;
}

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, emailType } = reqBody;
        console.log(token);

        if (!token || !emailType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let user
        if (emailType === "VERIFY") {
            user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

            if (!user) {
                return NextResponse.json({ error: "Invalid token" }, { status: 400 });
            }
            console.log(user);

            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save();
        } else if (emailType === "RESET") {
            user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

            if (!user) {
                return NextResponse.json({ error: "Invalid token" }, { status: 400 });
            }
            console.log(user);

            user.isVerified = true;
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;
            await user.save();
        }

        const successMessage = emailType === "VERIFY"
            ? "Email verified successfully"
            : "Password reset email verified successfully";

        return NextResponse.json(
            {
                message: successMessage,
                success: true,
                data: user
            }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({error : error instanceof Error ? error.message : "Unknown error occured"}, {status: 500});
    }
}
