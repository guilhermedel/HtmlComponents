let allMasks = [
  { cpf: "999.999.999-99" },
  { cell: "(99)9 9999-9999" },
  { date: "99/99/9999" },
  { cep: "99999-999" },
  { cnpj: "99.999.999/9999-99" },
  { datetime: "99/99/9999 99:99" },
  { time: "99:99" },
  { card: "9999 9999 9999 9999" },
  { expiration: "99/99" },
  { agency: "9999" },
  { account: "99999 9" },
];

function findMaskByType(type) {
  const foundObj = allMasks.find((obj) => obj[type]);
  return foundObj ? foundObj[type] : null;
}

function applyMaskOnInputChange(event, formattedMask) {
  const currentValue = event.target.value;
  if (currentValue !== formattedMask) {
    event.target.value = formattedMask;
  }
}

function getTypeMask(valueFinded) {
  const newValueFind = valueFinded.split(" ");
  let returnedValue = "";
  newValueFind.forEach((item) => {
    let key = allMasks.find((mask) => Object.keys(mask).includes(item));
    if (key) {
      returnedValue = Object.keys(key)[0];
    }
  });
  return returnedValue;
}

function initializeInputs() {
  const label = document.querySelectorAll("input.mask");
  const inputs = document.querySelectorAll("input.mask");
  inputs.forEach((input) => {
    if (input.className.includes("custom")) {
      const regex = /\[(.*?)\]/g;
      const matches = input.className.match(regex);
      const mask = matches[0].slice(1, -1);
      const formattedMask = mask.replaceAll("9", "_");
      input.value = formattedMask;
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("keyup", handleKeyUp);
      input.addEventListener("keypress", handleKeyPress);
      input.addEventListener("focus", () => handleFocus(formattedMask, input));
      input.addEventListener("input", (event) =>
        applyMaskOnInputChange(event, formattedMask)
      );
    } else {
      const typeMask = getTypeMask(input.className);
      const mask = findMaskByType(typeMask);
      const formattedMask = mask.replaceAll("9", "_");
      input.value = formattedMask;
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("keyup", handleKeyUp);
      input.addEventListener("keypress", handleKeyPress);
      input.addEventListener("focus", () => handleFocus(formattedMask, input));
      input.addEventListener("input", (event) =>
        applyMaskOnInputChange(event, formattedMask)
      );
    }
  });
}

function handleKeyPress(event) {
  if (event.key === "Backspace") {
    const currentValue = input.value;
    const cursorPosition = parseInt(input.dataset.cursorPosition, 10);
    if (cursorPosition > 0) {
      const charBeforeCursor = currentValue.charAt(cursorPosition - 1);
      if (/^\d$/.test(charBeforeCursor) || charBeforeCursor === "_") {
        input.value =
          currentValue.substring(0, cursorPosition - 1) +
          "_" +
          currentValue.substring(cursorPosition);
        input.selectionStart = cursorPosition - 1;
        input.selectionEnd = cursorPosition - 1;
      } else {
        input.selectionStart = cursorPosition - 1;
        input.selectionEnd = cursorPosition - 1;
      }
    }
  }
}

function handleKeyDown(event) {
  const input = event.target;
  input.dataset.cursorPosition = input.selectionStart;
  const enteredValue = String.fromCharCode(event.which || event.keyCode);
  if (/^\d$/.test(enteredValue)) {
    const currentValue = input.value;
    const nextIndex = currentValue.indexOf("_");
    if (nextIndex !== -1) {
      input.value =
        currentValue.substring(0, nextIndex) +
        enteredValue +
        currentValue.substring(nextIndex + 1);
      const cursorPosition = parseInt(input.dataset.cursorPosition, 10);
      input.selectionStart = cursorPosition + 1;
      input.selectionEnd = cursorPosition + 1;
    }
  }
  if (event.ctrlKey && event.key === "c") {
    input.select();
    const selectedText = input.value;
    navigator.clipboard
      .writeText(selectedText)
      .then(function () {
        console.log("Texto copiado para o portador de clipes");
      })
      .catch(function (err) {
        console.error("Erro ao copiar texto para o portador de clipes:", err);
      });
  }
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    event.preventDefault();
  }
}

function handleKeyUp(event) {
  const input = event.target;
  
  if (event.key === "Backspace") {
    const currentValue = input.value;
    const cursorPosition = parseInt(input.dataset.cursorPosition, 10);
    if (cursorPosition > 0) {
      const charBeforeCursor = currentValue.charAt(cursorPosition - 1);
      if (/^\d$/.test(charBeforeCursor) || charBeforeCursor === "_") {
        input.value =
          currentValue.substring(0, cursorPosition - 1) +
          "_" +
          currentValue.substring(cursorPosition);
        input.selectionStart = cursorPosition - 1;
        input.selectionEnd = cursorPosition - 1;
      } else {
        input.selectionStart = cursorPosition - 1;
        input.selectionEnd = cursorPosition - 1;
      }
    }
  }
}

function handleFocus(formattedMask, input) {
  if (input.value === "") {
    input.value = formattedMask;
  }
}

document.addEventListener("DOMContentLoaded", initializeInputs);

module.exports = initializeInputs;
