import { forwardRef, useEffect, useRef } from 'react';

const ImageInput = forwardRef(function ImageInput({ type = 'file', className = '', onFileSelect, isFocused = false, ...props }, ref) {
    const inputRef = ref || useRef();

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]); // Add isFocused to the dependency array

    return (
        <input
            {...props}
            type={type}
            className={`text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${className}`}
            ref={inputRef}
        />
    );
});

export default ImageInput;
