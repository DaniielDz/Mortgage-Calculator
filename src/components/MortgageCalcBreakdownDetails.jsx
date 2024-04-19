function MortgageCalcBreakdownDetails({ monthlyPayment, monthlyPropertyTax, monthlyInsurance, monthlyHOAFees, totalMonthlyPayment }) {
    return (
        <div className="h-[350px] m-auto w-max flex flex-col justify-center items-start gap-3">
            <div>
                <span>Mortgage Payment (P&amp;I)</span>
                <span>{`$${monthlyPayment}`}</span>
            </div>
            <div>
                <span>Home Insurance</span>
                <span>{`$${monthlyInsurance}`}</span>
            </div>
            <div>
                <span>Homeowners Insurance</span>
                <span>{`$${monthlyInsurance}`}</span>
            </div>
            <div>
                <span>Mortgage Insurance (PMI)</span>
                <span>$0</span>
            </div>
            <div>
                <span>Taxes & Other Fees</span>
                <span>{`$${monthlyPropertyTax}`}</span>
            </div>
            <div>
                <span>Property Taxes</span>
                <span>{`$${monthlyPropertyTax}`}</span>
            </div>
            <div>
                <span>HOA/Condo Fees</span>
                <span>{`$${monthlyHOAFees}`}</span>
            </div>
            <div>
                <span>Total Monthly Payment</span>
                <span>{`$${totalMonthlyPayment}`}</span>
            </div>
        </div>
    );
}

export default MortgageCalcBreakdownDetails;
