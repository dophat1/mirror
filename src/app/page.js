'use client'

import MoodInput from './components/MoodInput'
import { useState } from 'react'     

export default function Home() {
  const [mood, setMood] = useState('')
  
  return (
    <main>
      <h1>Mirror</h1>
      <MoodInput onMoodChange={setMood} />
      <p>Your current mood: {mood}</p>
    </main>
  )
}
