function func1(){
    this.name = "kunal das";
    this.college = "techno";   // fixed spelling
    this.location = "bangalore";
}

function func2(){
    func1.call(this);  // copy func1’s properties into "this"
    return { name: this.name, college: this.college, location: this.location };
}

console.log(func2());


function car() {
    this.car = "ferrari";
    this.model = "xyz";
    this.work = "speed";
}

// ✅ Add a method on car's prototype
car.prototype.drive = function () {
    return `${this.car} ${this.model} is driving at top speed!`;
};

function person() {
    car.call(this); // copy car's properties
    this.moving = "road";
    this.brake = "disc brake";
    this.speed = 240;
}

// ✅ person inherits from car
person.prototype = Object.create(car.prototype);
person.prototype.constructor = person;

// Add method to person
person.prototype.walk = function () {
    return `Walking on the ${this.moving} safely.`;
};

function work() {
    person.call(this); // copy person's + car's properties
    this.type = "racing";
}

// ✅ work inherits from person
work.prototype = Object.create(person.prototype);
work.prototype.constructor = work;

// Add method to work
work.prototype.race = function () {
    return `Racing with ${this.car} at ${this.speed} km/h using ${this.brake}`;
};

const obj = new work();

console.log(obj);                     // all properties
console.log(obj.drive());             // inherited from car
console.log(obj.walk());              // inherited from person
console.log(obj.race());              // defined in work
