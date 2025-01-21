import { DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Ui/card'

interface CardComponentProps {
  title: string;
  description: string;
  content?: string;
}

export default function CardComponent({ title, description, content }: CardComponentProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-left'>
          <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
            {title}
          </CardTitle>
          {/* <DollarSign className='ml-auto w-4 h-4' /> */}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-base sm:text-lg font-bold'>{content}</p>
      </CardContent>
    </Card>
  )
}
