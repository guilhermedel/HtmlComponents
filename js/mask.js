let inputValue = "";
let mask = "";

function blockNotNumeric(event) {
  mask = document.getElementById("inputValue").placeholder;
  let countNines = mask.split("").filter((char) => char === "9").length;
  const inputElement = event.target.value + String.fromCharCode(event.keyCode);
  console.log(inputElement);
  const inputChar = String.fromCharCode(event.keyCode);
  if (!/^\d+$/.test(inputChar)) {
    event.preventDefault();
  }
  if (countNines !== 0 && inputElement.length === countNines + 1) {
    event.preventDefault();
  }
}

function handleMask(mask) {
  inputValue = document.getElementById("inputValue").value;
  let value = inputValue.replace(/\D/g, "");
  let inputElement = document.getElementById("inputValue");
  inputElement.placeholder = mask;
  console.log(mask);
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
  if (inputValue !== "") {
    document.getElementById("inputValue").value = maskedValue;
  }
}
