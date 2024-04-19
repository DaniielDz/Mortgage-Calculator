function MortgageCalcBreakdownDetails({ M, CMS, totalTarifas }) {
    return (
        <div className="h-[350px]">
            <div>
                <span>Mortgage Payment (P&amp;I)</span>
                <span>{`$${M}`}</span>
            </div>
            <div>
                <span>Home Insurance</span>
                <span>{`$${CMS}`}</span>
            </div>
            <div>
                <span>Homeowners Insurance</span>
                <span>{`$${CMS}`}</span>
            </div>
            <div>
                <span>Mortgage Insurance (PMI)</span>
                <span>$0</span>
            </div>
            <div>
                <span>Taxes & Other Fees</span>
                <span>{`$${totalTarifas}`}</span>
            </div>
            <div>
                <span>Property Taxes</span>
                <span>{`$${totalTarifas}`}</span>
            </div>
            <div>
                <span>HOA/Condo Fees</span>
                <span>$0</span>
            </div>
        </div>
    );
}

export default MortgageCalcBreakdownDetails;
