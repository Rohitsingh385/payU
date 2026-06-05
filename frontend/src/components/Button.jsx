export function Button({ label, onClick }) {
    return (
        <button onClick={onClick} type="button" class="w-full text-white bg-gray-300 hover">{label}</button>
    )
}