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
      className='text-4xl font-normal text-[#333] h-[200px] w-[200px]'
      valueFormatter={valueFormatter}
      showAnimation={true}
    />
  );
}