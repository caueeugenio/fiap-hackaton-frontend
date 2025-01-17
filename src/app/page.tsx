import Header from '@/components/Header'
import { File, Package } from 'lucide-react'
import 'react-circular-progressbar/dist/styles.css'
export default function Home() {
  return (
    <main className='sm:ml-14 '>
      <Header />

      <section className='flex justify-around items-center mt-40'>
        <File
          className='text-white'
          style={{ height: '150px', width: '150px' }}
        />
        <Package
          className='text-white'
          style={{ height: '150px', width: '150px' }}
        />
      </section>

      {/* <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        <CardComponent
          title='CARD 1'
          description='Descrição'
          content='Conteúdo'
        ></CardComponent>
      </section> */}

      {/* <section className='mt-4 flex flex-col md:flex-row gap-4 p-4'>
        <ChartOverview></ChartOverview>
        <Ranking />
      </section> */}
    </main>
  )
}
