import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardComponentProps {
  title: string;
  description: string;
  content?: string;
  customHeight?: string;
  customWidth?: string;
}

export default function CardComponent({
  title,
  description,
  content,
  customHeight,
  customWidth,
}: CardComponentProps) {
  return (
    <Card
      className={`
      ${customHeight ? `h-[${customHeight}]` : "h-[200px] "}
      ${customWidth ? `w-[${customWidth}]` : "w-full"}
      `}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md text-gray-800 select-none">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      {content && (
        <CardContent>
          <p className="text-base sm:text-lg md:text-sm font-bold">{content}</p>
        </CardContent>
      )}
    </Card>
  );
}
