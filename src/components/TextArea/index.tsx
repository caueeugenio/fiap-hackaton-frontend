interface Props extends React.ComponentProps<'textarea'>{
    fieldName: string;
    content: string;
    placeholder: string;
}

export default function TextArea({fieldName, content, placeholder, value, onChange}: Props) {
    return (
        <div className="flex flex-col justify-center mt-4 w-full">
            <label htmlFor={fieldName} className="text-white font-bold text-left">{content} </label>
            <textarea 
                name={fieldName} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                rows={5}
                className="flex-1 w-full p-2 rounded-sm mt-2" />
        </div>
    )
}