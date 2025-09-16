class Person {
    constructor() {
        this.firstname = "kunal";
        this.lastname = "das";
    }
}

class EducationDetails extends Person {
    constructor() {
        super(); // call parent constructor
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
}

class Location extends Person {
    constructor() {
        super();
        this.CurrentAddress = "Bangalore HSR Layout";
        this.PermanentAddress = "Dhanbad Katras";
    }

    getLocationInfo() {
        return `Firstname: ${this.firstname}, Lastname: ${this.lastname}
Current Address: ${this.CurrentAddress}
Permanent Address: ${this.PermanentAddress}`;
    }
}
class workDetails extends EducationDetails{
    constructor(){
        super();
        this.work="full stack devlepoper mern development"
        this.work2="data analayst"
    }
    getWorkINFO(){
        return `Firstname:${this.firstname},Lastname:${this.lastname}\n
        current work :${this.work}\n
        2nd work:${this.work2}`
    }
}
// Usage
const edu = new EducationDetails();
console.log(edu.getEducationInfo());

const loc = new Location();
console.log(loc.getLocationInfo());

const workinfo=new workDetails()
console.log(workinfo.getWorkINFO())