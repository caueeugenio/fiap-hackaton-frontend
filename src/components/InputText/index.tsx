interface Props extends React.ComponentProps<'input'>{
    fieldName: string;
    content: string;
    placeholder: string;
    isDisabled?: boolean;
}

export default function InputText({fieldName, content, placeholder, value, onChange, isDisabled}: Props) {
    return (
        <div className="flex flex-col w-full gap-2">
            <p className="text-white font-bold mr-3 text-left">{content}: </p>
            <input disabled={isDisabled} name={fieldName} type="text" placeholder={placeholder} value={value} onChange={onChange} className="flex-1 p-2 rounded-sm" />
        </div>
    )
}