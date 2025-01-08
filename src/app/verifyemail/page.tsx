"use client";
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';

export default function verifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [token, setToken] = useState("$");
    const [emailType, setEmailType] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const handleVerifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token, emailType});
            setVerified(true);
        } catch (error: unknown) {
            setError(true);
            toast.error(error instanceof Error ? error.message : "Unknown Error Occured");
        }
    }

    const handleResetPassword = async () => {
        try {
            const res = await axios.post("/api/users/verifyemail", {token, emailType});
            setVerified(true);
            const email = res.data.data.email;
            console.log(res.data.data)
            router.push("/resetpassword/" + email);
        } catch (error: any) {
            setError(true);
            toast.error(error.message);
        }
    }
    
    useEffect(() => {
        setError(false);
        // const urlToken = window.location.search.split("=")[1]
        const urlToken = searchParams.get("token");
        const emailTypeReceived = searchParams.get("type");
        console.log(urlToken, emailTypeReceived);
        setToken(urlToken || "");
        setEmailType(emailTypeReceived || "");

    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0 && token !== "$") {
            emailType === "VERIFY" ? handleVerifyEmail() : handleResetPassword();
        }
        
        if(token.length == 0){
            toast.error("No token found");
        }
    }, [token]);

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
  )
}