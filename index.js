function Person(weight, height) {
    if (isNaN(weight) || Number(weight) <= 0.00) throw Error('peso inválido');
    if (isNaN(height) || Number(height) <= 0.00) throw Error('altura inválida');

    this.weight = weight;
    this.height = height;
}

function Dietician(height, weight) {
    Person.call(this, height, weight);
    this.imc = function() {
        return this.weight / (this.height ** 2);
    };
}
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

// Magreza, quando o resultado é menor que 18,5 kg/m2;
// Normal, quando o resultado está entre 18,5 e 24,9 kg/m2;
// Sobrepeso, quando o resultado está entre 24,9 e 30 kg/m2;
// Obesidade, quando o resultado é maior que 30 kg/m2;
function translateImc(imc) {
    if(imc < 18.5) return 'Magreza';
    if(imc < 24.9) return 'Normal';
    if(imc < 30) return 'Sobrepeso';
    return 'Obesidade'
}

// popula o span IMC
function populateImcData(dietician) {
    var imc = dietician.imc()
    var text = imc + ', ou seja, ' + translateImc(imc);
    document.querySelector('#imc').innerHTML = text;
}

function callPopulateImcDataBuilder() {
    var weightEl = document.querySelector('input#peso');
    var heightEl = document.querySelector('input#altura');
    
    return function() {
        populateImcData(new Dietician(weightEl.value, heightEl.value));
    }
}

window.onload = function() {
    document.querySelector('button.action')
        .addEventListener('click', callPopulateImcDataBuilder())
}


// ========================================
// Testes ... ou quase
// ========================================

// Sim, isso não é um teste...
function testTranslateImcTest() {
    console.log(translateImc(18.49))
    console.log(translateImc(18.50))
    console.log(translateImc(24.89))
    console.log(translateImc(24.90))
    console.log(translateImc(29.99))
    console.log(translateImc(30.00))
    console.log(translateImc(30.01))
}

function testCalculateImc() {
    // 1.77 / 88 = 28.08
    console.log(new Dietician(88.00, 1.77).imc())
    // 1.92 / 70 = 18.98
    console.log(new Dietician(70.00, 1.92).imc())

}

// testTranslateImcTest();
// testCalculateImc();