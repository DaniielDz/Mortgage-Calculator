import { useState } from 'react';

function PercentageInput({ title, value, onChange, max = 12 }) {
    const minPercentage = 0;

    // Estados locales para el valor del input y los mensajes de error
    const [inputValue, setInputValue] = useState(value.toFixed(2));
    const [errorMessage, setErrorMessage] = useState('');

    // Maneja los cambios del input
    const handleChange = (event) => {
        const targetValue = event.target.value;

        // Intenta convertir el valor a un número flotante
        const floatValue = parseFloat(targetValue);

        // Verifica si el valor es válido
        if (!isNaN(floatValue)) {
            // Verifica si el valor está dentro del rango permitido
            if (floatValue >= minPercentage && floatValue <= max) {
                // Si el valor es válido, formatea el número a dos decimales y actualiza el input
                const formattedValue = floatValue.toFixed(2);
                setInputValue(formattedValue);
                onChange(floatValue);
                setErrorMessage('');
            } else {
                // Si el valor está fuera del rango permitido, muestra un mensaje de error específico
                setErrorMessage(`Maximum value is ${max.toFixed(2)} Dismiss`);
            }
        } else {
            // Si el valor ingresado no es un número válido, muestra un mensaje de error
            setErrorMessage('Ingrese un número válido.');
        }
    };

    return (
        <div className='flex flex-col text-left gap-2 justify-center'>
            <span className='w-max border-b border-dotted border-b-[#09926a]'>{title}</span>
            <span className='w-max pr-3 pl-3 border border-solid border-[#ccc] rounded-md text-[15px] after:content-["%"] after:ml-1'>
                <input
                    type="text"
                    className='w-9 px-2 py-1 outline-none border-none text-right' // Ajusta el ancho del input
                    value={inputValue}
                    onChange={handleChange}
                />
            </span>
            {errorMessage && (
                <div className='text-red-600 text-sm mt-1'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default PercentageInput;
