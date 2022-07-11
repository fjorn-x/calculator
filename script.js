"use strict";

let number1 = 0;
let number2 = 0;
let operator = "";
let operatorCounter = 0;
let tempContent = "0";
const display = document.querySelector(".calculator-display");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const additionalOperators = Array.from(
  document.querySelectorAll(".additional-operator")
);

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    if (operatorCounter > 0) {
      display.textContent = "";
    }
    if (tempContent === "0" || display.textContent === "0") {
      tempContent = numberButton.value;
      display.textContent = tempContent;
    } else {
      tempContent += numberButton.value;
      display.textContent = tempContent;
    }

    if (numberButton.id === "=") {
      if (tempContent === "") {
        number2 = 0;
      } else {
        number2 = Number(tempContent);
      }

      display.textContent =
        operate(operator, number1, number2) === Infinity
          ? 'Click "C" to continue without errors'
          : Math.round(
              (operate(operator, number1, number2) + Number.EPSILON) * 100
            ) / 100;
      operatorCounter = 0;
    }

    if (numberButton.id === ".") {
      numberButton.disabled = true;
    }
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    document.getElementById(".").disabled = false;

    if (operatorCounter > 0) {
      number2 = Number(display.textContent);

      let temp =
        Math.round(
          (operate(operator, number1, number2) + Number.EPSILON) * 100
        ) / 100;
      display.textContent = temp;
      number1 = temp;
      operator = operatorButton.id;
      tempContent = "";
    } else {
      number1 = parseInt(display.textContent);
      display.textContent = "";
      tempContent = "0";
      operator = operatorButton.id;
      operatorCounter++;
    }
  });
});

additionalOperators.forEach((additionalOperator) => {
  additionalOperator.addEventListener("click", () => {
    switch (additionalOperator.id) {
      case "C":
        clearDisplay();
        break;
      case "%":
        display.textContent /= 100;
        tempContent = display.textContent;
      case "back":
        display.textContent = display.textContent.slice(0, -1);
        break;

      case "mod":
    }
  });
});

function clearDisplay() {
  number1 = 0;
  number2 = 0;
  operator = "";
  operatorCounter = 0;
  display.textContent = "0";
  document.getElementById(".").disabled = false;

  return "";
}

function invalidExpression() {
  return 'Click "C" to continue without errors';
}

function operate(operator, number1, number2) {
  switch (operator) {
    case "+":
      return number1 + number2;
      break;
    case "-":
      return number1 - number2;
      break;
    case "/":
      return number1 / number2;
      break;
    case "*":
      return number1 * number2;
      break;
    case "mod":
      return number1 % number2;
      break;
    default:
      return "Enter a valid operator";
      break;
  }
}
