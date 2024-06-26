function Result({ text, color, value }) {
    // Función para formatear el valor a moneda
    const valueFormatter = (number) => `$${Intl.NumberFormat('us').format(Math.round(number)).toString()}`;

    // Usa el color proporcionado como un estilo en línea para el `span`
    return (
        <div className="text-right text-sm sm:text-base text-[#333]">
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
            <span
                style={{ color: color }} // Aplica el color en línea
                className="font-semibold text-xl sm:text-2xl md:text-3xl"
            >
                {valueFormatter(value)}
            </span>
        </div>

    );
}

export default Result;
