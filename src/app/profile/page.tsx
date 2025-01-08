'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function page() {
    const router = useRouter();
    const [data, setData] = useState("")

    const profile = async () => {
        try {
            const res = await axios.post('/api/users/me');
            setData(res.data.data._id);
            toast.success("Profile fetched successfully");
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : "Unknown error occured");
            toast.error(error instanceof Error ? error.message : "Unknown error occured");    
        }
    }

    useEffect(() => {
        profile();
    }, [])
    const logout = async() => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            router.push('/login');
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : "Unknown error occured");
            toast.error(error instanceof Error ? error.message : "Unknown error occured");  
        }
    }

    const BottomGradient = () => (
        <>
          <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
      );

  return (
    <div className='flex flex-col max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-20'>
        <ToastContainer />
        <div className='flex flex-row items-center justify-center'>
            <h2 className="text-2xl font-bold text-center my-4 mx-2">Profile : </h2>
            <div className='text-lg'>{data === "" ? "" : <Link href={`/profile/${data}`} className="text-center">{data}</Link>}</div>
        </div>
        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium`}
            onClick={logout}
        >Logout
          <BottomGradient />
        </button>
    </div>
  )
}

export default page