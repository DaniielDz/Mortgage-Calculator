function Result({ text, color, value }) {
    // Función para formatear el valor a moneda
    const valueFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;

    // Usa el color proporcionado como un estilo en línea para el `span`
    return (
        <div className="text-right text-[15px] text-[#333]">
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
            <span
                style={{ color: color }} // Aplica el color en línea
                className="text-[26px] font-semibold"
            >
                {valueFormatter(value)}
            </span>
        </div>
    );
}

export default Result;
