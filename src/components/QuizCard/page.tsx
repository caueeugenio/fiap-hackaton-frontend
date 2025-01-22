import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface QuizCarProps {
  title: string
  content?: number
}

export default function QuizCard({ title, content }: QuizCarProps) {
  return (
    <Card className='flex flex-col sm:flex-row w-full sm:w-[533px] '>
      <CardHeader className='flex-1'>
        <div className='flex items-center justify-left'>
          <CardTitle className='text-lg sm:text-xl text-gray-800 select-none lg:text-lg'>
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='flex-1 p-0'>
        <div
          className='bg-primary_background flex justify-center rounded-lg'
          style={{ height: '100%' }}
        >
          <p className='text-base sm:text-lg font-bold text-white flex items-center justify-center h-full'>
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
