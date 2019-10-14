function Traveler(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
}
Traveler.prototype = {
    constructor: Traveler,
    hunt: function () {
        this.food += 2
    },
    eat: function () {
        if (this.food === 0) {
            this.isHealthy = false
            return
        } else {
            this.food -= 1
            return
        }
    }
}


function Wagon(capacity) {
    this.capacity = capacity;
    this.passengers = [];
}
Wagon.prototype = {
    constructor: Wagon,
    getAvailableSeatCount: function () {
        return this.capacity - this.passengers.length
    },
    join: function (traveler) {
        if (this.getAvailableSeatCount()) {
            this.passengers.push(traveler)
        } else {
            return
        }
    },
    shouldQuarantine: function () {
        let unHealthy = false
        this.passengers.forEach(function (traveler) {
            if (traveler.isHealthy === false) {
                unHealthy = true
            }
        })
        return unHealthy
    },
    totalFood: function () {
        let totalFood = 0
        this.passengers.forEach(function (passengers) {
            totalFood += passengers.food
        })
        return totalFood
    }
}


function Doctor(name) {
    Traveler.call(this, name);
}
Doctor.prototype = Object.create(Traveler.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.heal = function (traveler) {
    // healing code here
    traveler.isHealthy = true
}
function Hunter(name) {
    Traveler.call(this, name);
    this.food = 2;
}
Hunter.prototype = Object.create(Traveler.prototype);
Hunter.prototype.constructor = Hunter;
Hunter.prototype.hunt = function () {
    // hunting code here
    this.food += 5
};
Hunter.prototype.eat = function () {
    if (this.food > 1) {
        this.food -= 2
    } else {
        this.food = 0
        this.isHealthy = this.food > 1
    }
};
Hunter.prototype.giveFood = function (traveler, numOfFoodUnits) {
    if (this.food >= numOfFoodUnits) {
        traveler.food += numOfFoodUnits
        this.food -= numOfFoodUnits
    }
}



// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);