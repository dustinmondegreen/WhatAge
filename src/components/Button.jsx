export default function Button({ onClick, children, disabled }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-600 text-white px-6 py-3 rounded-lg 
                    hover:bg-blue-700 transition ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {children}
      </button>
    );
}