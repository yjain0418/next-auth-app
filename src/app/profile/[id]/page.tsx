'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function FullProfilePage() {
    const [data, setData] = useState({
        id: "",
        username: "",
        email: ""
    })

    const profile = async () => {
        try {
            const res = await axios.post('/api/users/me');
            setData({
                id: res.data.data._id,
                username: res.data.data.username,
                email: res.data.data.email
            });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : "Unknown error occured");
            toast.error(error instanceof Error ? error.message : "Unknown error occured");   
        }
    }

    useEffect(() => {
        profile();
    }, [])

    const BottomGradient = () => (
        <>
          <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
      );

  return (
    <div className='flex flex-col max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-20'>
        <h2 className="text-2xl font-bold text-center my-4 mx-2">User Details</h2>
        <div className='text-lg mb-4'><b>Id : </b>{data.id}</div>
        <div className='text-lg mb-4'><b>Username : </b>{data.username}</div>
        <div className='text-lg mb-4'><b>Email : </b>{data.email}</div>
        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium`}
        ><Link href="/profile">Back</Link>
          <BottomGradient />
        </button>
    </div>
  )
}