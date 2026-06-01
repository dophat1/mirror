'use client'

import {useState} from 'react'
import supabase from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'



export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()


    async function handleSubmit() {
        const result = await supabase.auth.signInWithPassword({ email, password })
        if (result.error) {
            console.log(result)
        } else {
            router.push('/dashboard') // redirects to /dashboard
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}