interface Props {
    title: string
}

export default function HeaderDetails({title}: Props) {
    return (
        <h1 className='text-white text-4xl font-bold text-center pb-4'>
          {title}
        </h1>
    )
}