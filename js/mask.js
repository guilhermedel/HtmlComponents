let allMasks = [
  { cpf: "999.999.999-99" },
  { cell: "(99)9 9999-9999" },
  { date: "99/99/9999" },
  { cep: "9999-999" },
  { cnpj: "99.999.999/9999-99" },
  { datetime: "99/99/9999 99:99" },
  { time: "99:99" },
  { card: "9999 9999 9999 9999" },
  { expiration: "99/99" },
  { agency: "9999" },
  { account: "99999 9" },
];

let inputFocusValue = "";
let finalInputValue = "";

function findMaskByType(type) {
  const foundObj = allMasks.find((obj) => obj[type]);
  if (foundObj) {
    return foundObj[type];
  } else {
    return null;
  }
}

const inputs = document.querySelectorAll("input.mask");
for (let i = 0; i < inputs.length; i++) {
  var typeMask = inputs[i].className.split(" ")[1];
  let mask = findMaskByType(typeMask);
  // inputs[i].addEventListener("keypress", (event) =>
  //   blockNotNumeric(event, mask)
  // );
  inputs[i].addEventListener("focus", () => handleFocus(inputs[i], mask));
  inputs[i].addEventListener("click", () => handleClick(inputs[i]));
  inputs[i].addEventListener("input", (event) => {
    const valorDigitado = event.target.value;
    // if (!/^[0-9]+$/.test(valorDigitado)) {
    //   return;
    // }
    const novoFormatoCpf = formatarCpf(valorDigitado);
    // console.log(novoFormatoCpf);
    // inputs[i].value = novoFormatoCpf;
  });
  // inputs[i].addEventListener("blur", () => handleMask(inputs[i], mask));
}

function formatarCpf(valor) {
  console.log(valor);
  let novoValor = "";
  let indiceMascara = 0;
console.log(inputFocusValue)
  for (let i = 0; i < valor.length; i++) {
    if (inputFocusValue[indiceMascara] !== "_") {
      novoValor += inputFocusValue[indiceMascara];
      indiceMascara++;
    }

    novoValor += valor[i];
  }
  console.log(novoValor);

  return novoValor;
}

function handleFocus(input, mask) {
  input.value = mask.replaceAll("9", "_");
  inputFocusValue = input.value;
}

function handleClick(input) {
  input.selectionStart = 0;
  input.selectionEnd = 0;
}

function handleInput(event, mask) {
  // let input = event.target;
  // let inputValue = input.value;
  // let maskedValue = mask.replace(/9/g, "_");
  // let finalValue = "";
  // let j = 0;
  // let cursorPosition = input.selectionStart;
  // for (let i = 0; i < mask.length; i++) {
  //    if (mask[i] === "9" && j < inputValue.length) {
  //      finalValue += inputValue[j++];
  //    } else {
  //      finalValue += mask[i];
  //    }
  // }
  // console.log(finalValue);
  // if (cursorPosition < inputValue.length) {
  //    input.selectionStart = cursorPosition;
  //    input.selectionEnd = cursorPosition;
  // } else {
  //    input.selectionStart = finalValue.length;
  //    input.selectionEnd = finalValue.length;
  // }
}

function blockNotNumeric(event, mask) {
  let countNines = mask.split("").filter((char) => char === "9").length;
  const inputElement = event.target.value + String.fromCharCode(event.keyCode);
  const inputChar = String.fromCharCode(event.keyCode);
  if (!/^\d+$/.test(inputChar)) {
    event.preventDefault();
  }
  if (countNines !== 0 && inputElement.length === countNines + 1) {
    event.preventDefault();
  }
}

function handleMask(input, mask) {
  let value = input.value.replace(/\D/g, "");
  let maskedValue = "";
  let j = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "9" && j < value.length) {
      maskedValue += value[j++];
    } else if (mask[i] === "9" && j >= value.length) {
      break;
    } else {
      maskedValue += mask[i];
    }
  }
  if (input.value !== "") {
    input.value = maskedValue;
  }
}
