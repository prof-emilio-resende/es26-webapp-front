function Person(weight, height) {
  if (isNaN(weight) || Number(weight) <= 0.0) throw Error("peso inválido");
  if (isNaN(height) || Number(height) <= 0.0) throw Error("altura inválida");

  this.weight = weight;
  this.height = height;
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  this.imc = function (callback) {
    callback({
      height: 1.9,
      weight: 88,
      imc: "24.38",
      imcDescription: "normal",
    });
  };
}
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

// popula o span IMC
function populateImcData(dietician) {
  dietician.imc(function (person) {
    var text = person.imc + ", ou seja, " + person.imcDescription;
    document.querySelector("#imc").innerHTML = text;
  });
}

function callPopulateImcDataBuilder() {
  var weightEl = document.querySelector("input#peso");
  var heightEl = document.querySelector("input#altura");

  return function () {
    populateImcData(new Dietician(weightEl.value, heightEl.value));
  };
}

window.onload = function () {
  document
    .querySelector("button.action")
    .addEventListener("click", callPopulateImcDataBuilder());
};

// ========================================
// Testes ... ou quase
// ========================================

// Sim, isso não é um teste...
function testTranslateImcTest() {
  console.log(translateImc(18.49));
  console.log(translateImc(18.5));
  console.log(translateImc(24.89));
  console.log(translateImc(24.9));
  console.log(translateImc(29.99));
  console.log(translateImc(30.0));
  console.log(translateImc(30.01));
}

function testCalculateImc() {
  // 1.77 / 88 = 28.08
  console.log(new Dietician(88.0, 1.77).imc());
  // 1.92 / 70 = 18.98
  console.log(new Dietician(70.0, 1.92).imc());
}

// testTranslateImcTest();
// testCalculateImc();
