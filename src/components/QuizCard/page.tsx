import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface QuizCarProps {
  title: string;
  rate?: string;
  customWidth?: string;
  customHeight?: string;
  description?: string;
}

export default function QuizCard({
  title,
  rate,
  customWidth,
  customHeight,
  description,
}: QuizCarProps) {
  return (
    <Card
      className={`flex flex-col sm:flex-row w-full flex-1 ${
        customWidth ? `w-[${customWidth}]` : "min-w-[350px]"
      } ${customHeight ? `h-[${customHeight}]` : "h-[80px]"}`}
    >
      <CardHeader className="flex-1 px-6">
        <div className="flex items-center justify-left">
          <CardTitle className="text-md text-gray-800 select-none">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="flex flex-wrap text-left">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 w-20">
        <div className="bg-primary_background flex justify-center h-full lg:rounded-[0_.5rem_.5rem_0] rounded-[0_0_.5rem_.5rem] md:rounded-[0_.5rem_.5rem_0]">
          <p className="text-base lg:text-xl font-bold text-white flex items-center justify-center h-full">
            {rate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
