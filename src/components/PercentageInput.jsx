import { useState } from 'react';

function PercentageInput({ title, value, onChange, max = 12 }) {
    const minPercentage = 0;

    // Estado local para el valor del input y el mensaje de error
    const [inputValue, setInputValue] = useState(value !== 0 ? value.toFixed(2) : '');
    const [errorMessage, setErrorMessage] = useState('');

    // Maneja los cambios del input
    const handleChange = (event) => {
        let targetValue = event.target.value;

        // Si el valor ingresado es vacío, actualiza el estado local y limpia el mensaje de error
        if (targetValue === '') {
            setInputValue('');
            setErrorMessage('');
            return;
        }

        // Si el primer número ingresado es menor o igual a 1, permitimos escribir otro número antes de agregar el punto
        if (targetValue.length === 1 && parseInt(targetValue) <= 1) {
            setInputValue(targetValue);
            return;
        }

        // Si el primer número ingresado es mayor que 1, agregamos el punto automáticamente
        if (targetValue.length === 1) {
            targetValue += '.';
        }

        // Formateamos el valor para permitir solo dos números después del punto
        const formattedValue = formatValue(targetValue);

        // Actualizamos el estado local con el nuevo valor
        setInputValue(formattedValue);

        // Intenta convertir el valor a un número flotante
        const floatValue = parseFloat(formattedValue);

        // Verifica si el valor es válido
        if (!isNaN(floatValue)) {
            // Verifica si el valor está dentro del rango permitido
            if (floatValue >= minPercentage && floatValue <= max) {
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

    // Función para formatear el valor y permitir solo dos números después del punto decimal
    const formatValue = (value) => {
        const parts = value.split('.');
        const integerPart = parts[0];
        let decimalPart = parts[1] || '';
        decimalPart = decimalPart.slice(0, 2); // Permitimos solo dos números después del punto
        return integerPart + '.' + decimalPart;
    };

    return (
        <div className='flex flex-col text-left gap-2 justify-center'>
            <span className='w-max border-b border-dotted border-b-[#09926a]'>{title}</span>
            <span className='w-max pr-3 pl-3 border border-solid border-[#ccc] rounded-md text-[15px] after:content-["%"] after:ml-1'>
                <input
                    type="text"
                    className='w-12 px-2 py-1 outline-none border-none text-right' // Ajusta el ancho del input
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
