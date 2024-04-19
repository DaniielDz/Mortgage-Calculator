import { LineChart } from '@tremor/react';

export function Graph({ data }) {
    // Inicializar chartdata como un arreglo vacío
    const chartdata = [];

    // Iterar sobre los datos y agregar cada elemento al array `chartdata` como un objeto
    data.forEach(element => {
        chartdata.push({
            year: `${element.year}`, // Asignar el año
            'Remaining Mortgage Balance': element.remainingMortgageBalance, // Asignar el saldo restante de la hipoteca
            'Principal Paid': element.principalPaid, // Asignar el principal pagado
            'Interest Paid': element.interestPaid // Asignar el interés pagado
        });
    });

    // Imprimir chartdata para verificar que se están agregando los datos correctamente
    console.log(chartdata);

    // Retornar el componente LineChart con los datos correctos
    return (
        <LineChart
            className="h-[300px] w-[500px]  flex flex-col items-center justify-center" // Altura del gráfico
            data={chartdata} // Los datos que se visualizan en el gráfico
            index="year" // La propiedad que se usa como índice (año)
            categories={[
                'Remaining Mortgage Balance', // Cambia el nombre mostrado en el gráfico
                'Principal Paid', // Cambia el nombre mostrado en el gráfico
                'Interest Paid', // Cambia el nombre mostrado en el gráfico
            ]}
            colors={[
              'orange-600',
              'green-500',
              'blue-600'
            ]}
            yAxisWidth={70} // Ancho del eje y
            showAnimation={true} // Muestra animación durante el renderizado
            showYAxis={true}
        />
    );
}
