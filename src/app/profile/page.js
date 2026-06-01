'use client'

import {useEffect, useState} from 'react'
import supabase from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function TasteProfiles() {
        const [loading, setLoading] = useState(true)
        const router = useRouter()
        const [user, setUser] = useState(null)
        const [profile, setProfile] = useState({
            films: '',
            music: '',
            games: '',
            books: '',
            hobbies: '',
            mangas: '',
            topic: ''
        })

        useEffect(() => { 
            async function checkSession() {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) {
                    router.push('/login')
                } else {
                    setUser(session.user)
                    setLoading(false)
                    const { data, error} = await supabase.from('taste_profiles').select('*').eq('user_id', session.user.id)
                    setProfile({
                        films: data[0]?.films || '',
                        music: data[0]?.music || '',
                        games: data[0]?.games || '',
                        books: data[0]?.books || '',
                        hobbies: data[0]?.hobbies || '',
                        mangas: data[0]?.mangas || '',
                        topic: data[0]?.topic || ''
                    })
                }       
            }
            checkSession()
        }, [])
        
        function handleChange(e) {
            setProfile({
                ...profile,
                [e.target.name]: e.target.value
            })
        }

        async function handleSave() {
            console.log('user id:', user.id)
            console.log('profile data:', profile)
            console.log('user at save time:', user)
            const { data, error } = await supabase.from('taste_profiles')
                .upsert({
                    user_id: user.id,
                    ...profile
                }, { onConflict: 'user_id' }) //need to specify onConflict for upsert to work properly
                
            if (error) {
                console.error('Error saving profile:', error)
            } else {
                console.log('Profile saved successfully:', data)
            }

        } 

        if (loading) {
            return <div>Loading...</div>
        }

    return (
        <div>
            <h1>{user.email}'s Taste Profiles</h1>
            <form>
                Hobbies: <input type="text" name="hobbies" onChange={handleChange} value={profile.hobbies} /><br />
                Films: <input type="text" name="films" onChange={handleChange} value={profile.films} /> <br />
                Music: <input type="text" name="music" onChange={handleChange} value={profile.music} /> <br />
                Games: <input type="text" name="games" onChange={handleChange} value={profile.games} />    <br />
                Books: <input type="text" name="books" onChange={handleChange} value={profile.books} /> <br />
                Mangas: <input type="text" name="mangas" onChange={handleChange} value={profile.mangas} />  <br />  
                Topic: <input type="text" name="topic" onChange={handleChange} value={profile.topic} /> <br />
            </form>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}