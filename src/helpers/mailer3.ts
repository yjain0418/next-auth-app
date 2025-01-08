import sgMail from '@sendgrid/mail';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface body {
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: body) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if (emailType === "VERIFY") {
            await User.findOneAndUpdate({_id : userId}, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET") {
            await User.findOneAndUpdate({_id : userId}, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
        
        const emailData = {
            from: 'yjain0418@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>
                    Hi there,  
                    <br><br>
                    We're so excited to have you with us! To get started, please click the link below to  
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}">
                        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}  
                    </a>.  
                    <br><br>
                    If the button doesn't work, don't worry! Simply copy and paste the link below into your browser:  
                    <br><br>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}">
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType}
                    </a>  
                    <br><br>
                    If you have any questions, feel free to reach out—we’re always here to help.  
                    <br><br>
                    Cheers,  
                    <br>
                    The Next Auth App Team
                    </p>`,
                } 
                
        sgMail
            .send(emailData)
            .then((response: unknown) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error: unknown) => {
                console.error('Error sending email:', error);
            });

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Unknown Error Occured");
    }
}