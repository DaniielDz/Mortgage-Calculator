export function calculateMortgage(homePrice, downPayment, interestRate, loanTerm, annualPropertyTax, annualInsurance, monthlyHOAFees) {
    // Initial calculations
    const principal = homePrice - downPayment; // Mortgage principal
    const monthlyInterestRate = interestRate / 100 / 12; // Monthly interest rate
    const totalMonths = loanTerm * 12; // Total number of months in the mortgage term

    // Calculate the monthly mortgage payment
    const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    // Calculate monthly property tax and insurance
    const monthlyPropertyTax = ((annualPropertyTax / 100 )* homePrice) / 12; // Monthly property tax
    const monthlyInsurance = annualInsurance / 12; // Monthly homeowners insurance
    const monthlyFees = monthlyHOAFees; // Monthly HOA or condo fees

    // Variables to accumulate total capital and interest payments
    let totalCapitalPaid = 0;
    let totalInterestPaid = 0;

    // Variable to store the outstanding balance
    let remainingBalance = principal;

    // Array to store annual mortgage data
    const annualMortgageData = [];

    // Iterate through each month to calculate monthly payments
    for (let month = 1; month <= totalMonths; month++) {
        // Calculate monthly interest
        const monthlyInterest = remainingBalance * monthlyInterestRate;

        // Calculate the monthly principal payment
        const monthlyPrincipalPayment = monthlyPayment - monthlyInterest;

        // Subtract the principal payment from the remaining balance
        remainingBalance -= monthlyPrincipalPayment;

        // If we're not in the last year (year 30), add the interest of the year
        if (month <= totalMonths - 12) {
            totalInterestPaid += monthlyInterest;
        }

        // Accumulate capital paid each month
        totalCapitalPaid += monthlyPrincipalPayment;

        // If it's the end of a year, store the annual results
        if (month % 12 === 0) {
            const year = month / 12;

            // Add annual data to the array
            annualMortgageData.push({
                year: year,
                remainingMortgageBalance: Math.round(remainingBalance),
                principalPaid: Math.round(totalCapitalPaid),
                interestPaid: Math.round(totalInterestPaid)
            });
        }
    }

    // Return the final results of the mortgage and annual data
    return {
        monthlyPayment: monthlyPayment,
        monthlyPropertyTax: monthlyPropertyTax,
        monthlyInsurance: monthlyInsurance,
        monthlyFees: monthlyFees,
        annualMortgageData: annualMortgageData
    };
}