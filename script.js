const pilots = [
  { name: "Maçã", color: "red" },
  { name: "Céu", color: "DeepSkyBlue" },
  { name: "Ouro", color: "gold" },
  { name: "Couro", color: "SaddleBrown" },
  { name: "Azul", color: "cadetblue" }
];

let moneyLabel = document.getElementById("money-label");
let resultLabel = document.getElementById("result");
const pilotSelect =  document.getElementById("pilot-options");
const betInput =  document.getElementById("bet-input");

let raceStarted = false;

let updateInterval;
let speedMult = 0.9;
let endLine = 450;

let money = 100;

let cars = [];

class Carro {
    constructor(_id, _color, _pilotName, _xSpeed){
        this.id = _id; 
        this.x = 0; 
        this.xSpeed = _xSpeed; 
        this.color = _color;
        this.pilotName = _pilotName;
    }
}

function styleCar(car, color) {
    car.style.background = color;
    car.style.display = "inline-block";
    car.style.color = "white";

    return car;
}

function pilotOptionsSetup(){
    for (const pilot of pilots){
       let option = document.createElement("option");
       option.value = pilot.name;
       option.innerHTML = pilot.name;
       pilotSelect.appendChild(option); 
    }
}

function updateMoneyUI(){
    moneyLabel.innerHTML = `R$ ${money}`;
}

function generateCars(){
    let game = document.getElementById("jogo");

    let carros = [];
    for (let i = 0; i < pilots.length; i++){
        let car = document.createElement("div");
        car.innerHTML = pilots[i].name;

        car = styleCar(car, pilots[i].color);

        let carroId = `carro-${i}`;
        car.setAttribute("id", carroId);
        
        carros.push(new Carro(carroId, pilots[i].color, pilots[i].name, 2 + Math.random() * speedMult));

        game.appendChild(car);

        for (let i = 0; i < 2; i++){
            game.appendChild(document.createElement("br"));
        }
    }

    return carros;
}

function carroMove(carro, moveX){
    let carroGrafico = document.getElementById(carro.id); 
    carro.x = carro.x += moveX;
    carroGrafico.style.translate = `${carro.x}px`
}

function checkEnd(endLine, carroX){
    if (carroX > endLine) {
        return true
    }
    return false;
}

function update(carros, betAmount){
    for(let car of carros) {
        carroMove(car, car.xSpeed);

        if (checkEnd(endLine, car.x)){
            raceEnd(car, carros);

            if (car.pilotName == pilotSelect.value) {
                money += betAmount * 2;
                updateMoneyUI();
            }
            break;
        };
    }
}

function raceEnd(car) {
    clearInterval(updateInterval);
    resultLabel.innerHTML = car.pilotName;
    raceStarted = false;         
}

function setupCars() {
    cars = generateCars();
}

function resetCars() {
    for (let car of cars) {
        console.log(car);
        car.x = 0;
        carroGrafico = document.getElementById(car.id);
        carroGrafico.style.translate = `0px`
    }
}

function raceStart() {
    if (raceStarted) {
        return;
    }

    let betAmount = betInput.value;
    money -= betAmount;
    updateMoneyUI();

    resetCars();
    resultLabel.innerHTML = "";

    raceStarted = true;  
    updateInterval = setInterval(update, 50, cars, betAmount);
}

setupCars();
pilotOptionsSetup();
updateMoneyUI();