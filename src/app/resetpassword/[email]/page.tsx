'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

interface ResetPasswordPageProps {
  params: Promise<{
    email: string;
  }>;
}

export default function ResetPasswordPage({params}: ResetPasswordPageProps) {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;  // Await the promise resolution
        setEmail(resolvedParams.email);  // Store the email after resolving
      } catch (error) {
        console.error("Error resolving params", error);
      }
    };

    fetchParams();  // Run the async function
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) {
      alert("Please fill all the fields");
      return;
    }

    console.log(email, password);
    try {
      setLoading(true);

      const response = await fetch("/api/users/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newpassword: password
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password changed successfully");
        router.push("/login");
      } else {
        toast.error(data.error || "Password updation failed.");
      }

    } catch (error: unknown) {
      toast.error((error instanceof Error ? error.message : "Unknown Error Occured") || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const BottomGradient = () => (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );

  useEffect(() => {
    if (password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password])

  return (
    <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-20">
      <ToastContainer />
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
        Enter new Password
      </h2>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <Label htmlFor="email">New Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password →"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  )
}