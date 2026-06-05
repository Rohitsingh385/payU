export function InputBox({label, placeholder}){
    return (
        <div>
            <div className="text-sm font-weight text-left py-2">
                {label}
            </div>
            <input placeholder={placeholder} className="w-full px-2 py-1" />
        </div>
    )
}