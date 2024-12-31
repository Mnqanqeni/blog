import React from 'react';

const Input = React.forwardRef(function Input(
    { label, id, type = 'text', className = '', ...props },
    ref
) {
    // const id = userId()
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                ref={ref}
                type={type}
                className={`w-full ${className}`}
                {...props}
            />
        </div>
    );
});

export default Input;
