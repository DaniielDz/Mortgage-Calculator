function MortgageCalcBreakdownDetails({ monthlyPayment, monthlyPropertyTax, monthlyInsurance, monthlyHOAFees, totalMonthlyPayment }) {
    // Función para formatear los valores como dólares
    const valueFormatter = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    return (
        <div className="flex flex-col w-full max-w-md p-4 bg-white rounded-lg shadow-md space-y-3 m-auto my-16">            
            {/* Elementos de desglose */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> {/* Círculo verde */}
                    <span className="font-bold text-gray-600">Mortgage Payment (P&amp;I):</span>
                </div>
                <span className="font-medium text-gray-800">{valueFormatter(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span> {/* Círculo naranja */}
                    <span className="font-bold text-gray-600">Home Insurance:</span>
                </div>
                <span className="font-medium text-gray-800">{valueFormatter(monthlyInsurance)}</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> {/* Círculo amarillo */}
                    <span className="font-bold text-gray-600">Taxes &amp; Other Fees:</span>
                </div>
                <span className="font-medium text-gray-800">{valueFormatter(monthlyPropertyTax)}</span>
            </div>
            
            {/* Otros elementos de desglose */}
            <div className="flex justify-between">
                <span className="text-gray-600">Property Taxes:</span>
                <span className="font-medium text-gray-800">{valueFormatter(monthlyPropertyTax)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">HOA/Condo Fees:</span>
                <span className="font-medium text-gray-800">{valueFormatter(monthlyHOAFees)}</span>
            </div>
            
            {/* Total de pagos mensuales */}
            <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-lg font-semibold">Total Monthly Payment:</span>
                <span className="text-lg font-semibold text-green-600">{valueFormatter(totalMonthlyPayment)}</span>
            </div>
        </div>
    );
}

export default MortgageCalcBreakdownDetails;
