interface Props {
    title: string;
}

export default function HeaderDetails({title}: Props) {
    return (
        <h1 className='text-white text-4xl font-bold text-center pb-4 mt-8'>
          {title}
        </h1>
    )
}