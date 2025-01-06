import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findOneAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET") {
            await User.findOneAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1bcaaf5de282f7", // X
                pass: "dfe7ae91efdbb2" // X
            }
        });

        const mailOptions = {
            from: 'jain.yashu1403@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>
                    Click 
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}">
                        here
                    </a> 
                    to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
                    or copy and paste the link below in your browser: 
                    <br>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}">
                        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}
                    </a>
                    </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
}