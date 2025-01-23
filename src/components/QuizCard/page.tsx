import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface QuizCarProps {
  title: string
  rate?: number
  customWidth?: string
  description?: string
}

export default function QuizCard({
  title,
  rate,
  customWidth,
  description,
}: QuizCarProps) {
  return (
    <Card
      className={`flex flex-col sm:flex-row w-full flex-1 ${
        customWidth ? `w-[${customWidth}]` : 'w-[533px]'
      }`}
    >
      <CardHeader className='flex-1'>
        <div className='flex items-center justify-left'>
          <CardTitle className='text-lg sm:text-xl text-gray-800 select-none lg:text-lg'>
            {title}
          </CardTitle>
        </div>
        <CardDescription className='flex flex-wrap text-left mt-2'>
            {description}
          </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 p-0'>
        <div
          className='bg-primary_background flex justify-center'
          style={{ height: '100%', borderRadius: '0 .5rem .5rem 0' }}
        >
          <p className='text-base lg:text-xl font-bold text-white flex items-center justify-center h-full'>
            {rate}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
