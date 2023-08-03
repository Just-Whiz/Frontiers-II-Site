const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const report = document.getElementById("report");
let result;

function add() {
    result = parseFloat(input1.value) + parseFloat(input2.value);
    report.innerHTML += `<br/> ${input1.value} + ${input2.value}: ${result}`;
}

function subtract() {
    result = parseFloat(input1.value) - parseFloat(input2.value);
    report.innerHTML += `<br/> ${input1.value} - ${input2.value}: ${result}`;
}

function multiply() {
    result = parseFloat(input1.value) * parseFloat(input2.value);
    report.innerHTML += `<br/> ${input1.value} * ${input2.value}: ${result}`;
}

function divide() {
    result = parseFloat(input1.value) / parseFloat(input2.value);
    report.innerHTML += `<br/> ${input1.value} / ${input2.value}: ${result}`;
}