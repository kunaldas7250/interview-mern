class Person {
    constructor(firstname, lastname) {
        if (new.target === Person) {
            throw new Error("❌ Abstract class Person cannot be instantiated directly");
        }
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // abstract method
    work() {
        throw new Error("❌ Abstract method 'work()' must be implemented");
    }
}

class EducationDetails extends Person {
    constructor(firstname, lastname) {
        super(firstname, lastname); // ✅ pass args
        this.Education1 = "bachelor degree";
        this.Education2 = "diploma degree";
        this.Education3 = "class 10";
    }

    getEducationInfo() {
        return `${this.firstname} ${this.lastname} qualification details:
Highest qualification: ${this.Education1}
Second: ${this.Education2}
Lowest: ${this.Education3}`;
    }

    work() {
        return `${this.firstname} is studying`; // ✅ implement abstract method
    }
}

class Location extends Person {
    constructor(firstname, lastname) {
        super(firstname, lastname); // ✅ pass args
        this.CurrentAddress = "Bangalore HSR Layout";
        this.PermanentAddress = "Dhanbad Katras";
    }

    getLocationInfo() {
        return `Firstname: ${this.firstname}, Lastname: ${this.lastname}
Current Address: ${this.CurrentAddress}
Permanent Address: ${this.PermanentAddress}`;
    }

    work() {
        return `${this.firstname} is working remotely`; // ✅ implement abstract method
    }
}

class WorkDetails extends EducationDetails {
    constructor(firstname, lastname) {
        super(firstname, lastname); // ✅ pass args
        this.work1 = "Full Stack MERN Developer";
        this.work2 = "Data Analyst";
    }

    getWorkINFO() {
        return `Firstname: ${this.firstname}, Lastname: ${this.lastname}
Current work: ${this.work1}
Second work: ${this.work2}`;
    }

    work() {
        return `${this.firstname} works as a ${this.work1}`; // ✅ implement abstract method
    }
}

// ✅ Usage
const edu = new EducationDetails("Kunal", "Das");
console.log(edu.getEducationInfo());
console.log(edu.work());

const loc = new Location("Kunal", "Das");
console.log(loc.getLocationInfo());
console.log(loc.work());

const workinfo = new WorkDetails("Kunal", "Das");
console.log(workinfo.getWorkINFO());
console.log(workinfo.work());
