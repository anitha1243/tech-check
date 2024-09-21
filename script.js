import { calculateTermDeposit } from "./src/calculate.js";

const depositEl = document.getElementById("deposit-amount");
const interestRatePercentEl = document.getElementById("interest-rate");
const termInMonthsEl = document.getElementById("investment-term");
const interestPaidFrequencyEl = document.getElementById("interest-paid");

const calculateBtn = document.getElementById("calculate");
const balanceEl = document.getElementById("balance");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const balance = calculateTermDeposit(
    depositEl.value,
    interestRatePercentEl.value,
    termInMonthsEl.value,
    interestPaidFrequencyEl.value
  );

  balanceEl.innerText = balance;
});
