import ChartOverview from '@/components/chart'
import { Ranking } from '@/components/ranking'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
export default function Home() {
  return (
    <main className='sm:ml-14 '>
      <header>
        <div className='flex items-center  bg-header_background'>
          <div className='p-10 flex items-center' style={{ width: '100%' }}>
            <Avatar className='w-60 h-60'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div className='text-white p-6'>
              <p className='text-4xl'>João da Silva</p>
              <p className='text-2xl'>5ª Serie - Turma XPTO</p>
            </div>

            <div
              className='hidden sm:block border-l border-white h-full mx-12'
              style={{ height: '217px' }}
            ></div>
          </div>
        </div>
      </header>

      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                CARD 1
              </CardTitle>
              <DollarSign className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>Descrição</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>Conteúdo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                CARD 2
              </CardTitle>
              <DollarSign className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>Descrição</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>Conteúdo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                CARD 3
              </CardTitle>
              <DollarSign className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>Descrição</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>Conteúdo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                CARD 4
              </CardTitle>
              <DollarSign className='ml-auto w-4 h-4' />
            </div>
            <CardDescription>Descrição</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>Conteúdo</p>
          </CardContent>
        </Card>
      </section>

      <section className='mt-4 flex flex-col md:flex-row gap-4 p-4'>
        <ChartOverview></ChartOverview>
        <Ranking />
      </section>
    </main>
  )
}
