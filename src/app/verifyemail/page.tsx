"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { Suspense } from "react";

// The actual page content component
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [emailType, setEmailType] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token, emailType });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      toast.error(error instanceof Error ? error.message : "Unknown Error Occurred");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token, emailType });
      setVerified(true);
      const email = res.data.data.email;
      router.push("/resetpassword/" + email);
    } catch (error: unknown) {
      setError(true);
      toast.error(error instanceof Error ? error.message : "Unknown Error Occurred");
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = searchParams.get("token");
    const emailTypeReceived = searchParams.get("type");
    setToken(urlToken);
    setEmailType(emailTypeReceived);
  }, [searchParams]);

  useEffect(() => {
    if (token && emailType) {
      if (emailType === "VERIFY") {
        handleVerifyEmail();
      } else if (emailType === "RESET") {
        handleResetPassword();
      }
    } else if (!token) {
      toast.error("No token found");
    }
  }, [token, emailType]);

  return (
    <div>
      <ToastContainer />
      {verified && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center my-4">Email verified successfully</h2>
          <Link href="/login">Continue to Login</Link>
        </div>
      )}

      {error && (
        <h2 className="text-2xl font-bold text-center my-4">Error verifying email</h2>
      )}
    </div>
  );
}

// The main page component wrapped in Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
