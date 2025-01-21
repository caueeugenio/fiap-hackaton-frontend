import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar'

export default function Header() {
  return (
    <header className='header'>
      <div className='flex items-center bg-header_background'>
        <div className='p-10 flex items-center'>
          <Avatar className='lg:w-60 lg:h-60'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className='text-white p-6'>
            <p className='sm:text-lg lg:text-4xl'>João da Silva</p>
            <p className='sm:text-lg lg:text-2xl'>5ª Serie - Turma XPTO</p>
          </div>
        </div>
      </div>
    </header>
  )
}
