const dviceTextEl = document.querySelector(".dvice__app--text");
const dviceIdEl = document.querySelector("#advice__id");
const dviceBtnEl = document.querySelector(".dvice__app--dice");

const TIME_SEC = 10;
let count = 0;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderAdviceSlip = async function (id, sec) {
  try {
    const url = `https://api.adviceslip.com/advice/${id}`;
    const res = await Promise.race([fetch(url), timeout(sec)]);

    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `Something went wrong! (${res.status}) Please reload the page!`
      );

    const quote = data.slip.advice;
    const idQuote = data.slip.id;

    dviceTextEl.textContent = quote;
    dviceIdEl.textContent = idQuote;
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

const btnOperation = function () {
  count++;
  renderAdviceSlip(count, TIME_SEC);
};

dviceBtnEl.addEventListener("click", btnOperation);
