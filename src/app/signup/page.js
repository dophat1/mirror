'use client'

import { useState } from 'react'   
import supabase from '../../lib/supabaseClient'     
 

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    const result =await supabase.auth.signUp({ email, password })
    console.log(result)
  }
  return (
    <div>
      <h1>Sign Up</h1>
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