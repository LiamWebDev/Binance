const inputAfterFee = document.getElementById("after-fee");
const inputPricePoint = document.getElementById("price-point");
const breakEvenDiv = document.getElementById("break-even");
const containDiv = document.getElementById("container");

function submit() {
  const afterFeeNumber = Number(inputAfterFee.value);
  const pricePointNumber = Number(inputPricePoint.value);

  const originalUSDT = afterFeeNumber + afterFeeNumber / 9999;
  const originalUSDTround = Math.round(originalUSDT);
  const originalVET = originalUSDT / pricePointNumber;
  const originalVETround = Math.round(originalVET);

  const breakDiv = `<p>The USDT value before fees was ${originalUSDTround} (rounded)</p>`;
  const breakDiv2 = `<p>The VET value before the opening trade was ${originalVETround} (rounded)</p>`;

  breakEvenDiv.insertAdjacentHTML("beforeend", breakDiv);
  breakEvenDiv.insertAdjacentHTML("beforeend", breakDiv2);

  let startValue = pricePointNumber + 0.001;
  const lastValue = pricePointNumber - 0.03;

  while (startValue >= lastValue) {
    let startValue2 = startValue.toPrecision(4);
    let diff = afterFeeNumber / startValue2 - originalVET;
    let calced = afterFeeNumber / startValue2;
    let priceRow =
      '<div class="row"><div class="col" id="first-col"><p>' +
      startValue2 +
      '</p></div><div class="col" id="second-col"><p>' +
      Math.round(diff) +
      '</p></div><div class="col" id="third-col"><p>' +
      Math.round(calced) +
      ' <span id="orig">(' +
      originalVETround +
      ")</span></p></div></div>";

    containDiv.insertAdjacentHTML("beforeend", priceRow);

    startValue = startValue - 0.0001;
  }
}
