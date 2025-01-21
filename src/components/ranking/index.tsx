import { CircleDollarSign, DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function Ranking() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <div className='flex items-center justify-center'>
          <CardTitle className='text-lg sm:text-xl text-gray-800'>
            dsddsd
          </CardTitle>
          <CircleDollarSign className='ml-auto w-4 h-4' />
        </div>
        <CardDescription>XXXXXXX</CardDescription>
      </CardHeader>

      <CardContent>
        <article className='flex items-center gap-2 border-b  py-2'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src='https://github.com/shadcn.png'></AvatarImage>
            <AvatarFallback>XX</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm sm:text-base font-semibold'>fdfdfdf</p>
            <span className='text-[12px] sm:text-sm text-gray-400'>fsdfsdf</span>
          </div>
        </article>
        <article className='flex items-center gap-2 border-b  py-2'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src='https://github.com/shadcn.png'></AvatarImage>
            <AvatarFallback>XX</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm sm:text-base font-semibold'>fdfdfdf</p>
            <span className='text-[12px] sm:text-sm text-gray-400'>fsdfsdf</span>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
