'use client'

import { useState } from 'react'         

export default function MoodInput({ onMoodChange }) {
  const [value, setValue] = useState('') 

  return (
    <div>
      <input type="text" 
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onMoodChange(e.target.value)
            }}
        />
      <button onClick={() => console.log(value)}>Save</button>
    </div>
  )
}