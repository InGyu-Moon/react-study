'use client'
import {useState} from 'react'

export default function Test(){
    const [age, setAge] = useState(10);
    return (
        <div>
            {age}
        </div>
    )
}