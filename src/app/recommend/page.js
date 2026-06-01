'use client'

import {useEffect, useState} from 'react'
import supabase from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SendProfile() {
    const router = useRouter()
    const [result, setResult] = useState({message: ''})

    const [profile, setProfile] = useState({
        hobbies: '',
        films: '',
        music: '',
        games: '',
        books: '',
        mangas: '',
        topic: ''
    })
    async function fetchProfile() {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/login')
            } else {
                // Fetch the user's profile data from Supabase
                const  {data} = await supabase.from('taste_profiles')
                    .select('*')  
                    .eq('user_id', session.user.id)
            setProfile(data[0])
        }}
    
    useEffect(() => {
        fetchProfile()
    }, [])

    async function handleSend() {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
        const result = await response.json()
        setResult(result)
    }
   

    return (
        <div>
            <h1>Send Profile</h1>
            <button onClick={handleSend}>Send Profile to AI</button>
            <p>Result: {result.message}</p>
        </div>
    )
    
}