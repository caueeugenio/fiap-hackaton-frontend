import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Avatar {
  userName: string
  className: string
  grade: string
  photo?: string
}
export default function Header({ userName, className, grade, photo }: Avatar) {
  return (
    <header className='header'>
      <div className='flex items-center justify-center bg-header_background h-full'>
        <div className='flex items-center md:flex-col'>
          <Avatar className='lg:w-60 lg:h-60'>
            <AvatarImage src={photo} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className='text-white p-6'>
            <p className='text-3xl md:text-4xl lg:text-4xl '>{userName}</p>
            <p className='text-lg md:text-1xl lg:text-2xl '>
              {grade} - {className}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
