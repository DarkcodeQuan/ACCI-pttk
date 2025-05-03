import React, { useEffect, useState } from 'react';

export default function SuccessMessage({ message, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    // Tự động ẩn sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message || !isVisible) return null;

    return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-md z-50">
            <div className="flex justify-between items-center">
                <div>
                    <strong className="font-semibold text-lg">Thành công: </strong>
                    <span className="text-lg">{message}</span>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                    className="text-green-500 hover:text-green-700 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652A1 1 0 105.652 7.066L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}