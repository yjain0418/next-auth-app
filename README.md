# Next.js Authentication App

A full-stack authentication app built with Next.js, featuring user authentication, email verification, and password management.

## Features

1. **Authentication**:
   - Login, Signup, and Logout.
   - Token-based session management.
   
2. **Password Management**:
   - Password reset functionality.
   - Change password feature.

3. **Email Verification**:
   - Email verification after signup.
   - Resend verification emails.

4. **User Profile**:
   - Fetch and manage user details via the `profile` page.

5. **Database Integration**:
   - MongoDB database connection and model definitions using Mongoose.

6. **Middleware**:
   - Protect API routes and pages with authentication middleware.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/next-auth-app.git
   cd next-auth-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env.local file with the following variables:

   ```bash
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-database
   TOKEN_SECRET=your_secret_key
   DOMAIN=https://your_domain
   SMTP_SERVER_HOST=services_name
   SMTP_SERVER_USERNAME=your_mailer_username
   SMTP_SERVER_PASSWORD=your_mailer_password
   API_KEY=resend_api
   SENDGRID_API_KEY=sendgrip_api
   EMAIL=your_email
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit http://localhost:3000.

## Usage
 - Signup: Register a new user account.
 - Login: Access your account with your credentials.
 - Profile Management: View and edit your profile details.
 - Password Reset: Request a password reset link and update your password.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## Contact
If you have any questions or feedback, reach out to me on [LinkedIn](https://www.linkedin.com/in/yjain0418).
