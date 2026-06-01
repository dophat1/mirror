'use client'

import Link from "next/link";
import { useEffect, useState } from "react"
import supabase from "../../lib/supabaseClient"

export default function Nav() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    if (!user) return null

    return (
        <nav>
            <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/recommend">Recommend</Link></li>
                <li><Link href="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}