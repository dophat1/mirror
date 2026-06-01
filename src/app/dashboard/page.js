'use client'

import {useEffect, useState} from 'react'
import supabase from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
        const [loading, setLoading] = useState(true)
        const router = useRouter()
        const [user, setUser] = useState(null)

        useEffect(() => { 
            async function checkSession() {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) {
                    router.push('/login')
                } else {
                    setLoading(false)
                    setUser(session.user)
                }       
            }
            checkSession()
        }, [])

        async function handleLogout() {
            await supabase.auth.signOut()
            router.push('/login')
        }

        if (loading) {
            return <div>Loading...</div>
        }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>User email {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}