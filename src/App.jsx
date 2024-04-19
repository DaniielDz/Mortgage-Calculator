import { useState, useEffect } from 'react';
import ColorToggleButton from './components/ColorToggleButton';
import TabComponent from './components/Tab';
import { DonutGraph } from './components/DonutGraph';
import Result from './components/Result';
import DollarInput from './components/DollarInput';
import PercentageInput from './components/PercentageInput';
import MortgageCalcBreakdownDetails from './components/MortgageCalcBreakdownDetails';
import { Graph } from './components/Graph';
import './index.css';
import { calculateMortgage } from './Helpers/index';

function App() {
    // Crear estados para los valores de entrada
    const [homePrice, setHomePrice] = useState(200000);
    const [downPayment, setDownPayment] = useState(40000);
    const [interestRate, setInterestRate] = useState(2.00);
    const [loanTerm, setLoanTerm] = useState(30);
    const [annualPropertyTax, setAnnualPropertyTax] = useState(2);
    const [annualInsurance, setAnnualInsurance] = useState(200);
    const [monthlyHOAFees, setMonthlyHOAFees] = useState(0);
    
    // Estado para controlar la visibilidad de la sección de resultados
    const [showResults, setShowResults] = useState(true);
    // Estado para controlar el tab seleccionado
    const [selectedTab, setSelectedTab] = useState(0);
    const [mortgageOverTimeData, setMortgageOverTimeData] = useState([]);
    
    useEffect(() => {
        // Llama a la función `calculateMortgage` y actualiza el estado de `mortgageOverTimeData`
        const mortgageOverTime = calculateMortgage(homePrice, downPayment, interestRate, loanTerm, annualPropertyTax, annualInsurance, monthlyHOAFees);
        setMortgageOverTimeData(mortgageOverTime);
    }, [homePrice, downPayment, interestRate, loanTerm, annualPropertyTax, annualInsurance, monthlyHOAFees]);
    
    
    const valueFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;

    // Llamar a la función y obtener los resultados
    const results = mortgageOverTimeData;


    // Render de la aplicación
    return (
        <>
        <main className='flex flex-col gap-3 max-w-4xl m-auto p-4 lg:p-8'>
            <h1 className='mb-2 text-4xl text-left'>Mortgage Calculator</h1>
            <div className='flex flex-col lg:flex-row w-full h-max bg-white'>
                {/* Cambios para hacer el aside responsive */}
                <aside className='text-left w-full lg:max-w-1/3 p-4 border-r lg:border-r-[#ccc] border-b lg:border-b-0'>
                    <div>
                        <p className='text-[15px]'>Enter your details below to estimate your monthly mortgage payment with taxes, fees, and insurance.</p>
                    </div>
                    <h3 className='mt-6 mb-1 text-lg font-semibold'>Edit Your Mortgage Details</h3>
                    <form className='flex flex-col gap-2'>
                        {/* Usando DollarInput para campos de dólares */}
                        <DollarInput title='Home Price' value={homePrice} onChange={setHomePrice} maxValue={10000000} minValue={10000} />
                        <DollarInput title='Down Payment' value={downPayment} onChange={setDownPayment} maxValue={10000000} />
                        <PercentageInput title='Mortgage Interest Rate' value={interestRate} onChange={setInterestRate} max={12} />
                        <div className='flex flex-col'>
                            <select id="select" className="select w-full rounded-md border border-[#ccc] p-2" onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}>
                                <option value="30">30-Year Fixed</option>
                                <option value="15">15-Year Fixed</option>
                            </select>
                        </div>
                        <PercentageInput title='Annual Property Tax' value={annualPropertyTax} onChange={setAnnualPropertyTax} max={5} />
                        <DollarInput title='Annual Homeowners Insurance' value={annualInsurance} onChange={setAnnualInsurance} maxValue={15000} />
                        <DollarInput title='Monthly HOA/Condo Fees' value={monthlyHOAFees} onChange={setMonthlyHOAFees} maxValue={13000} />
                    </form>
                </aside>
                {/* Div principal con flex-col en dispositivos móviles */}
                <div className='w-full lg:w-2/3 h-full text-center'>
                    {/* TabComponent con el manejador de cambio de tab */}
                    <TabComponent onTabChange={(index) => setSelectedTab(index)} />
    
                    <h2 className='mt-12 mb-1 text-2xl font-bold'>Total Monthly Payment Breakdown</h2>
                    <p className='text-lg'>Based on a <span>{valueFormatter(homePrice - downPayment)}</span> mortgage</p>
    
                    {/* Section One */}
                    {selectedTab === 0 && (
                        <section id="sectionOne">
                            {showResults && (
                                <div className='w-full h-[350px] px-3 flex lg:flex-row justify-center lg:justify-evenly items-center'>
                                    <div className='flex flex-col gap-6'>
                                        <Result 
                                            text={"Taxes & <br />Other Fees"}
                                            color={"#fccd03"}
                                            value={results.monthlyPropertyTax}
                                        />
                                        <Result 
                                            text={"Home <br />Insurance"}
                                            color={"#ef840f"}
                                            value={results.monthlyInsurance}
                                        />
                                    </div>
                                    <div className='flex justify-center w-full lg:w-[200px]'>
                                        <DonutGraph 
                                            monthlyPayment={results.monthlyPayment}
                                            monthlyPropertyTax={results.monthlyPropertyTax}
                                            monthlyInsurance={results.monthlyInsurance}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        <Result 
                                            text={"Mortgage<br/>Payment (P&amp;I)"}
                                            color={"#54ba6c"}
                                            value={results.monthlyPayment}
                                        />
                                    </div>
                                </div>
                            )}
                            {showResults === false && (
                                <MortgageCalcBreakdownDetails
                                    monthlyPayment={results.monthlyPayment}
                                    monthlyPropertyTax={results.monthlyPropertyTax}
                                    monthlyInsurance={results.monthlyInsurance}
                                    totalMonthlyPayment={results.monthlyPayment + results.monthlyPropertyTax + results.monthlyInsurance}
                                    monthlyHOAFees={monthlyHOAFees}
                                />
                            )}
    
                            <div className="w-full h-[60px]"> 
                              {/* Pasa onTabChange a ColorToggleButton */}
                              <ColorToggleButton onTabChange={(index) => setShowResults(index === 0)} />
                            </div>
                        </section>
                    )}
    
                    {/* Section Two */}
                    {selectedTab === 1 && (
                        <section id='sectionTwo' className='flex flex-col items-center justify-center mt-12'>
                            <Graph data={results.annualMortgageData} />
                        </section>
                    )}
                </div>
            </div>
        </main>
    </>
    
    );
}

export default App;