import { useState } from 'react';

function DollarInput({ title, value, onChange, maxValue }) {
    // Establece estados locales para manejar el valor del input y el mensaje de error
    const [inputValue, setInputValue] = useState(value);
    const [errorMessage, setErrorMessage] = useState('');

    // Formatea los valores en dólares sin incluir el símbolo de moneda
    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(number);
    };

    // Maneja los cambios del input
    const handleChange = (event) => {
        const targetValue = event.target.value;
        // Remueve cualquier carácter no numérico del valor
        const sanitizedValue = targetValue.replace(/[^0-9]/g, '');
        // Convierte el valor a un número entero
        const intValue = parseInt(sanitizedValue, 10);

        // Si el valor es válido y no supera el máximo permitido
        if (!isNaN(intValue) && intValue <= maxValue) {
            // Formatea el valor en dólares mientras el usuario escribe
            setInputValue(formatCurrency(intValue));
            onChange(intValue);
            setErrorMessage(''); // Limpia el mensaje de error
        } else if (intValue > maxValue) {
            // Si el valor supera el máximo permitido, limita el valor al máximo y muestra mensaje de error
            setInputValue(formatCurrency(maxValue));
            onChange(maxValue);
            setErrorMessage(`Maximum value is $${formatCurrency(maxValue)}. Dismiss`);
        } else {
            // Si el usuario borra todos los dígitos, configura el valor del input a vacío
            setInputValue(targetValue);
            onChange(0);
        }
    };

    return (
        <div className='flex flex-col text-left gap-2 justify-center'>
            <span className='w-max border-b border-dotted border-b-[#09926a]'>{title}</span>
            <span className="pl-3 before:content-['$'] border border-solid border-[#ccc] rounded-md text-[15px]">
                <input
                    type="text"
                    className="px-2 py-1 outline-none border-none"
                    value={inputValue}
                    onChange={handleChange}
                />
            </span>
            {/* Muestra mensaje de error si existe */}
            {errorMessage && (
                <div className='text-red-600 text-sm mt-1'>
                    {errorMessage}
                    <button
                        className="text-blue-600 ml-2"
                        onClick={() => setErrorMessage('')}
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
}

export default DollarInput;
