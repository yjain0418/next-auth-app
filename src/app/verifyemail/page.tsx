"use client";
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { type } from 'node:os';

export default function verifyEmail() {
    const searchParams = useSearchParams();
    
    const [token, setToken] = useState("$");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const handleVerifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            toast.error(error.message);
        }
    }
    
    useEffect(() => {
        setError(false);
        // const urlToken = window.location.search.split("=")[1]
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");

    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0 && token !== "$") {
            handleVerifyEmail();
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