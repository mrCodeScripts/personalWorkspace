'use client';
type ButtonComponent = {
    text: string;
    onClick?: () => void;
};

export default function ButtonExample1({ text, onClick }: ButtonComponent) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {text}
        </button>
    );
}