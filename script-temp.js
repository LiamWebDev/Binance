const inputAfterFee = document.getElementById("after-fee");
const inputPricePoint = document.getElementById("price-point");
const breakEvenDiv = document.getElementById("break-even");
const containDiv = document.getElementById("container");
const inputIncrement = document.getElementById("increment");
const refreshIcon = document.getElementById("refresh-icon");
const pricingRows = document.getElementById("price-rows");

inputIncrement.value = 0.0001;

function reset() {
  refreshIcon.style.display = "none";
  inputAfterFee.value = "";
  inputPricePoint.value = "";
  removeAllChildNodes(pricingRows);
  removeAllChildNodes(breakEvenDiv);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

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
    refreshIcon.style.display = "inline";
    let increment = inputIncrement.value;
    let startValue2 = startValue.toPrecision(4);
    let diff = afterFeeNumber / startValue2 - originalVET;
    let calced = afterFeeNumber / startValue2;
    let gain = diff * startValue2;
    let paraClass = gain < 0 ? "red" : "green";
    let priceRow =
      '<div class="row"><div class="col" id="first-col"><p>' +
      startValue2 +
      '</p></div><div class="col" id="second-col"><p id="' +
      paraClass +
      '">' +
      Math.round(diff) +
      '</p></div><div class="col" id="third-col"><p id="' +
      paraClass +
      '">' +
      Math.round(calced) +
      ' <span id="orig">(' +
      originalVETround +
      ')</span></p></div><div class="col" id="fourth-col"><p id="' +
      paraClass +
      '">($) ' +
      gain.toFixed(2) +
      "</p></div></div>";

    pricingRows.insertAdjacentHTML("beforeend", priceRow);

    /*startValue = startValue - 0.0001; */

    startValue = startValue - increment;
  }
}
