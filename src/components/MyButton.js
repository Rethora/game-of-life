export const MyButton = ({ text, onClick }) => (
    <button
        className="my-button"
        onClick={onClick}
    >
        {text}
    </button>
)