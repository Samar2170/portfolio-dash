
export default function FormLayout({ children, ...props }) {
    return (
      <div className="flex flex-col justify-center items-center pt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{props.name}</h3>
        {children}
      </div>

    )
}