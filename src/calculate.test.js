import { calculateTermDeposit, calculateBalancePerMonth } from "./calculate";

describe("calculateTermDeposit()", () => {
  it.each`
    deposit    | interestRatePercent | termInMonths | interestPaidFrequency | expectedBalance
    ${1000}    | ${0}                | ${3}         | ${"Monthly"}          | ${1000}
    ${"10000"} | ${1.1}              | ${36}        | ${"Monthly"}          | ${10335}
    ${10000}   | ${1.1}              | ${36}        | ${"Quarterly"}        | ${10335}
    ${10000}   | ${"1.1"}            | ${36}        | ${"Annually"}         | ${10334}
    ${10000}   | ${1.1}              | ${"36"}      | ${"AtMaturity"}       | ${10330}
    ${1500000} | ${0.1}              | ${60}        | ${"AtMaturity"}       | ${1507500}
  `(
    "should return the balance $expectedBalance given deposit $deposit interestRatePercent $interestRatePercent termInMonths $termInMonths interestPaidFrequency $interestPaidFrequency",
    ({
      deposit,
      interestRatePercent,
      termInMonths,
      interestPaidFrequency,
      expectedBalance,
    }) => {
      expect(
        calculateTermDeposit(
          deposit,
          interestRatePercent,
          termInMonths,
          interestPaidFrequency
        )
      ).toBe(expectedBalance);
    }
  );

  it("should return an error when deposit is not a number", () => {
    const deposit = "012b";
    const interestRatePercent = 3.4;
    const termInMonths = 2;
    const interestPaidFrequency = "Monthly";

    expect(
      calculateTermDeposit(
        deposit,
        interestRatePercent,
        termInMonths,
        interestPaidFrequency
      )
    ).toBe("Deposit amount is not a valid number");
  });

  it("should return an error when interest rate is not a number", () => {
    const deposit = 15000;
    const interestRatePercent = "3.4  /n";
    const termInMonths = 2;
    const interestPaidFrequency = "Monthly";

    expect(
      calculateTermDeposit(
        deposit,
        interestRatePercent,
        termInMonths,
        interestPaidFrequency
      )
    ).toBe("Interest rate is not a valid number");
  });

  it("should return an error when investment term (months) is not a number", () => {
    const deposit = 15000;
    const interestRatePercent = 3.4;
    const termInMonths = "20 months";
    const interestPaidFrequency = "Monthly";

    expect(
      calculateTermDeposit(
        deposit,
        interestRatePercent,
        termInMonths,
        interestPaidFrequency
      )
    ).toBe("Investment term (months) is not a valid number");
  });

  it("should return an error when interest paid frequency is not a valid option", () => {
    const deposit = 15000;
    const interestRatePercent = 3.4;
    const termInMonths = 20;
    const interestPaidFrequency = "Every day";

    expect(
      calculateTermDeposit(
        deposit,
        interestRatePercent,
        termInMonths,
        interestPaidFrequency
      )
    ).toBe("Interest paid frequency is not a valid option");
  });
});

describe("calculateBalancePerMonth()", () => {
  it("should return interest earned and balance for the terms", () => {
    const months = 2;
    const interestRate = 1.1;
    const currentBalance = 10000;

    const expectedInterestEarned = [
      {
        month: 1,
        interestEarned: 9.17,
        newBalance: 10009.17,
      },
      {
        month: 2,
        interestEarned: 18.34,
        newBalance: 10018.34,
      },
    ];

    const results = calculateBalancePerMonth(
      months,
      interestRate,
      currentBalance
    );
    expect(results[0].interestEarned).toBe(
      expectedInterestEarned[0].interestEarned
    );
    expect(results[0].newBalance).toBe(expectedInterestEarned[0].newBalance);

    expect(results[1].interestEarned).toBe(
      expectedInterestEarned[1].interestEarned
    );
    expect(results[1].newBalance).toBe(expectedInterestEarned[1].newBalance);
  });
});
