'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { login } from '@/api/auth'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    try {
      const user = await login(email, password)
      console.log(user)
      if (user.access_token) {
        router.push('/home')
      } else {
        setError('Usuário não encontrado.')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    }
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
        <Button className='w-full mt-7 bg-button_primary' type='submit'>
          Login
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
