class Person {
    #AdharNumber;
    #PhoneNumber;

    constructor(firstname, lastname, AdharNumber, PhoneNumber) {
        if (new.target === Person) {
            throw new Error("❌ Cannot instantiate abstract class Person directly");
        }
        this.firstname = firstname;
        this.lastname = lastname;
        this.#AdharNumber = AdharNumber;
        this.#PhoneNumber = PhoneNumber;
    }

    // only controlled access to private data
    getPrivateInfo() {
        return `Aadhar (last 4 digits): ****${this.#AdharNumber.slice(-4)}, Phone: ****${this.#PhoneNumber.slice(-3)}`;
    }
}

class EducationDetails extends Person {
    constructor(firstname, lastname, AdharNumber, PhoneNumber) {
        super(firstname, lastname, AdharNumber, PhoneNumber); // call parent constructor
        this.Education1 = "bachelor degree";
        this.Education2 = "diploma degree";
        this.Education3 = "class 10";
    }

    getEducationInfo() {
        return `${this.firstname} ${this.lastname} qualification details:
Highest qualification: ${this.Education1}
Second: ${this.Education2}
Lowest: ${this.Education3}
Private: ${this.getPrivateInfo()}`;
    }
}

// Now create child object
const obj = new EducationDetails("Kunal", "Das", "123456789012", "9876543210");
console.log(obj.getEducationInfo());
