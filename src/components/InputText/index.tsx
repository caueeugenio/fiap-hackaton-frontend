interface Props extends React.ComponentProps<'input'>{
    fieldName: string;
    content: string;
    placeholder: string;
}

export default function InputText({fieldName, content, placeholder, value, onChange}: Props) {
    return (
        <div className="flex items-center justify-center">
            <label htmlFor={fieldName} className="text-white font-bold mr-3">{content}: </label>
            <input name={fieldName} type="text" placeholder={placeholder} value={value} onChange={onChange} className="flex-1 px-2 py-2 rounded-sm" />
        </div>
    )
}