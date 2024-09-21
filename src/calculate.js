const compoundedTerms = {
  Monthly: 12,
  Quarterly: 4,
  Annually: 1,
  AtMaturity: 0,
};

export function calculateTermDeposit(
  deposit,
  interestRatePercent,
  termInMonths,
  interestPaidFrequency
) {
  deposit = Number(deposit);
  interestRatePercent = Number(interestRatePercent);
  termInMonths = Number(termInMonths);

  if (Number.isNaN(deposit)) return "Deposit amount is not a valid number";
  if (Number.isNaN(interestRatePercent))
    return "Interest rate is not a valid number";
  if (Number.isNaN(termInMonths))
    return "Investment term (months) is not a valid number";

  if (compoundedTerms[interestPaidFrequency] === undefined)
    return "Interest paid frequency is not a valid option";

  const interestRateDecimal = interestRatePercent / 100;
  const termInYears = termInMonths / 12;
  const compoundedTerm = compoundedTerms[interestPaidFrequency];

  let balance;
  if (compoundedTerm > 0)
    balance =
      deposit *
      Math.pow(
        1 + interestRateDecimal / compoundedTerm,
        termInYears * compoundedTerm
      );
  else balance = deposit + deposit * interestRateDecimal * termInYears;

  return Math.round(balance);
}

export const calculateBalancePerMonth = (
  months,
  interestRate,
  currentBalance
) => {
  const monthlyInterestRateDecimal = interestRate / 12 / 100;

  return [...Array(months).keys()]
    .map((month) => month + 1)
    .map((month) => {
      const interestEarned =
        Math.ceil(currentBalance * monthlyInterestRateDecimal * 100 * month) /
        100;

      return {
        month,
        interestEarned,
        newBalance: currentBalance + interestEarned,
      };
    });
};
