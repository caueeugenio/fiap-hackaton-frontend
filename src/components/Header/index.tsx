import { ProgressBar } from '../ProgressBar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Header() {
  return (
    <header className='header'>
      <div className='flex items-center bg-header_background'>
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
          {/* <div className=' '>
            <div className='w-80'>
              <span className='text-white'>Progresso 1</span>

              <ProgressBar />
            </div>
            <div className='w-80'>
              <span className='text-white'>Progresso 2</span>
              <ProgressBar />
            </div>
          </div> */}
        </div>
      </div>
    </header>
  )
}
