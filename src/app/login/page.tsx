'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4 p-4 sm:p-8'>
      <Image src='./user.svg' alt='logo' width={200} height={200} />

      <form onSubmit={handleSubmit} className='w-full max-w-md'>
        <div className='mb-4'>
          <span className='text-white'>Email:</span>
          <Input
            className='w-full h-[48px] bg-white'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <span className='text-white'>Password:</span>
          <Input
            className='w-full h-[48px] bg-white'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          className='w-full mt-7 bg-button_primary'
          type='submit'
          onClick={() => router.push('/home')}
        >
          Login
        </Button>
      </form>
    </div>
  )
}
