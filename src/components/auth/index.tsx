"use client";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export const Login = ({envs}:{envs: {mainUser: string, mainPassword:string}}) => {
    const [ formData, setFormData ]:[{[name:string]:string}, (oldValue:any)=>void] = useState({});
    const [ error, setError ] = useState("");
    const router = useRouter();
    const setInput = (evt: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const loginAction = () => {
        if(formData["username"]===envs.mainUser && formData["password"]===envs.mainPassword){
            setError("");
            router.push(`/logged-in?userKey=${btoa(formData.username)}`);            
        }else{
            setError("NO");
        }
    };

    return (
        <section className="w-full text-center text-3xl">
        <div>Login</div>
        {error && <div>{error}</div>}
        <div className="py-4">
            <label className='mb-2'>Username: </label>
            <input name="username"className="text-black border-gray-600 rounded-full p-5"  onChange={setInput}/>
        </div>
        <div>
            <label className='mb-2'>Password: </label>
            <input type="password" name="password" className="text-black border-gray-600 rounded-full p-5" onChange={setInput}/>
        </div>
        <div><button onClick={loginAction} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full w-full px-8 py-5 me-2 my-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 shadow-lg">Enter</button></div>
        </section>
    );
}