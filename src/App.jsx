import { useState } from 'react';
import ColorToggleButton from './components/ColorToggleButton';
import TabComponent from './components/Tab';
import { DonutChartUsageExampleWithCustomColors } from './components/Dunut';
import Result from './components/Result';
import DollarInput from './components/DollarInput';
import PercentageInput from './components/PercentageInput';
import MortgageCalcBreakdownDetails from './components/MortgageCalcBreakdownDetails';
import './index.css';
import { Tab } from '@chakra-ui/react';

function App() {
    // Crear estados para los valores de entrada
    const [PV, setPV] = useState(200000);
    const [D, setD] = useState(40000);
    const [IA, setIA] = useState(2.00);
    const [TP, setTP] = useState(30);
    const [ImpuestoAnual, setImpuestoAnual] = useState(2);
    const [seguroAnual, setSeguroAnual] = useState(200);
    const [HOAyCondominios, setHOAyCondominios] = useState(0);
    
    // Estado para controlar la visibilidad de la sección de resultados
    const [showResults, setShowResults] = useState(true);

    // Función para operar
    function operar(PV, D, IA, TP, ImpuestoAnual, seguroAnual, HOAyCondominios) {
        const P = PV - D;
        const IM = (IA / 100) / 12;
        const n = TP * 12;

        const IAP = PV * (ImpuestoAnual / 100);
        const CMI = (IAP / 12);

        const M = Math.round(P * ((IM * (1 + IM)**n) / ((1 + IM)**n - 1)));
        const CMS = Math.round((seguroAnual / 12));
        const totalTarifas = Math.round(CMI + HOAyCondominios);

        return { P, M, CMS, totalTarifas };
    }

    const { P, M, CMS, totalTarifas } = operar(PV, D, IA, TP, ImpuestoAnual, seguroAnual, HOAyCondominios);

    const valueFormatter = (number) =>
        `$${Intl.NumberFormat('us').format(number).toString()}`;

    return (
        <>
            <main className='flex flex-col gap-3 max-w-4xl m-auto'>
                <h1 className='mb-2 text-4xl text-left'>Mortgage Calculator</h1>
                <div className='w-full h-max flex bg-white'>
                    <aside className='text-left h-full w-full max-w-[33%] p-7 border-r border-r-[#ccc]'>
                        <div>
                            <p className='text-[15px]'>Enter your details below to estimate your monthly mortgage payment with taxes, fees and insurance.</p>
                        </div>
                        <h3 className='mt-6 mb-1 text-lg font-semibold'>Edit Your Mortgage Details</h3>
                        <form className='flex flex-col gap-2'>
                            {/* Usando DollarInput para campos de dólares */}
                            <DollarInput title='Home Price' value={PV} onChange={setPV} maxValue={10000000} minValue={10000} />
                            <DollarInput title='Down Payment' value={D} onChange={setD} maxValue={10000000} />
                            <PercentageInput title='Mortgage Interest Rate' value={IA} onChange={setIA} max={12} />
                            <div className='flex flex-col'>
                                <select id="select" className="select" onChange={(e) => setTP(parseInt(e.target.value, 10))}>
                                    <option value="30">30-Year Fixed</option>
                                    <option value="15">15-Year Fixed</option>
                                </select>
                            </div>
                            <PercentageInput title='Annual Property Tax' value={ImpuestoAnual} onChange={setImpuestoAnual} max={5} />
                            <DollarInput title='Annual Homeowners Insurance' value={seguroAnual} onChange={setSeguroAnual} maxValue={15000} />
                            <DollarInput title='Monthly HOA/Condo Fees' value={HOAyCondominios} onChange={setHOAyCondominios} maxValue={13000} />
                        </form>
                    </aside>
                    <div className='w-full h-full text-center'>
                      <TabComponent />

                        <h2 className='mt-12 mb-1 text-2xl font-bold'>Total Monthly Payment Breakdown</h2>
                        <p className='text-lg'>Based on a <span>{valueFormatter(P)}</span> mortgage</p>
                        

                        {/* Muestra de resultados primera sección */}
                        {showResults && (
                            <div className='w-full h-[350px] flex items-center justify-evenly'>
                                <div className='flex flex-col gap-6'>
                                    <Result 
                                        text={"Taxes & <br />Other Fees"}
                                        color={"#fccd03"}
                                        value={totalTarifas}
                                    />
                                    <Result 
                                        text={"Home <br />Insurance"}
                                        color={"#ef840f"}
                                        value={CMS}
                                    />
                                </div>
                                <div className='w-[200px]'>
                                    <DonutChartUsageExampleWithCustomColors 
                                        M={M}
                                        totalTarifas={totalTarifas}
                                        CMS={CMS}    
                                    />
                                </div>
                                <Result 
                                    text={"Mortgage<br/>Payment (P&amp;I)"}
                                    color={"#54ba6c"}
                                    value={M}
                                />
                            </div>
                        )}

                        {/* Muestra MortgageCalcBreakdownDetails solo si selectedTab es igual a 1 */}
                        {showResults === false && (
                            <MortgageCalcBreakdownDetails
                                M={M}
                                CMS={CMS}
                                totalTarifas={totalTarifas}
                                totalMonthlyPayment={M + CMS + totalTarifas}
                            />
                        )}
                        <div className="w-full h-[60px]"> 
                            {/* Pasa onTabChange a ColorToggleButton */}
                            <ColorToggleButton onTabChange={(index) => setShowResults(index === 0)} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
