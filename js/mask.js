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
  console.log("mask: " + typeMask)
  let mask = findMaskByType(typeMask);
  let formattedMask = mask.replaceAll("9", "_");
  inputs[i].addEventListener("keypress", (event) =>
    handleInput(event, inputs[i])
  );
  inputs[i].addEventListener("focus", () =>
    handleFocus(formattedMask, inputs[i])
  );
}

function handleFocus(formattedMask, input) {
  input.value = formattedMask;
}
function handleInput(event, input) {
  input.selectionStart = 0;
  input.selectionEnd = 0;
  let currentValue = input.value;
  let enteredValue = String.fromCharCode(event.which || event.keyCode);
  if (/^\d$/.test(enteredValue)) {
    let nextIndex = currentValue.indexOf("_");
    if (nextIndex !== -1) {
      input.value =
        currentValue.substring(0, nextIndex) +
        enteredValue +
        currentValue.substring(nextIndex + 1);
    }
  }
  event.preventDefault();
}
