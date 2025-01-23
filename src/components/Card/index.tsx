import { DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface CardComponentProps {
  title: string
  description: string
  content?: string
  customHeight?: string
}

export default function CardComponent({
  title,
  description,
  content,
  customHeight,
}: CardComponentProps) {
  return (
    <Card className={`${customHeight ? `h-[${customHeight}]` : 'h-[200px] '}`}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
            {title}
          </CardTitle>
            <button className='ml-auto bg-primary_background text-white px-4 py-2 rounded'>
              Iniciar Quiz
            </button>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-base sm:text-lg font-bold'>{content}</p>
      </CardContent>
    </Card>
  )
}
