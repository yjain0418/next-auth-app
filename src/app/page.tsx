import Link from "next/link";

export default function Home() {
  const BottomGradient = () => (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
  return (
    <div className='flex flex-col mt-32 max-w-3xl w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-20"'>
      <h2 className="text-2xl font-bold text-center my-4 mx-2">Welcome to Next Auth App</h2>
      <h2 className="text-lg text-center font-sans mb-4 mx-2">This is an authentication platform built on Next.js, designed to handle user authentication without relying on NextAuth.js. It features custom email/password authentication, email verification, and password reset functionalities. Secure hashed tokens are used for email verification and password recovery, ensuring robust user data protection. This platform is fully customizable, offering developers complete control over authentication workflows while maintaining scalability and security.</h2>
      <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium`}
        >
          <Link href="/signup">Explore App</Link>
          <BottomGradient />
        </button>
    </div>
  );
}
