import React from 'react';

export default function SelectInput({
    id,
    value,
    onChange,
    className = '',
    required = false,
    disabled = false,
    children,
    ...props
}) {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className} ${
                disabled ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
            {...props}
        >
            {children}
        </select>
    );
}
