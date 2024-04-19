import { DonutChart } from '@tremor/react';

export function DonutGraph({ monthlyPayment, monthlyPropertyTax, monthlyInsurance }) {
  const sales = [
    {
      name: 'Mortgage Payment (P&I)',
      sales: monthlyPayment,
    },
    {
      name: 'Home Insurance',
      sales: monthlyInsurance,
    },
    {
      name: 'Taxes & Other Fees',
      sales: monthlyPropertyTax,
    }
  ];

  const valueFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;
  return (
    <DonutChart
    data={sales}
    category="sales"
    index="name"
    colors={[
        'green-500',
        'orange-600',
        'yellow-400'
    ]}
    className='text-4xl font-normal text-[#333] h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72'
    valueFormatter={valueFormatter}
    showAnimation={true}
    showLegend={false} // Si tienes leyenda y quieres mostrarla, cambia a true
/>

  );
}