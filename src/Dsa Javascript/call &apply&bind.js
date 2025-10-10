let obj={firstname:"kunal",lastname:"das",address:"dhanbad"}
function callmethod(age){
     return `hello my ${this.firstname} and ${this.lastname} and i am from ${this.address} and my age is ${age}`;
}
console.log(callmethod.call(obj,25))

let obj={firstname:"kunal",lastname:"das",address:"dhanbad"}
function callmethod(age,value){
     return `hello my ${this.firstname} and ${this.lastname} and i am from ${this.address}  myphone number is ${value}  and my age is ${age}`;
}
console.log(callmethod.call(obj,25,78456))

let arr=[1,20,3,4,5]
let arr2 = {
    firstname: "kunal",
    lastname: "das",
    age: 25,
    address: {
        current_address: { name: "Bengaluru" },
    },
    permanent_address: {
        name: "dhanbad"
    }
};

function applymethod(value){
  let obj=`hello my firstname is ${this.firstname} and my name is ${this.lastname} my age is ${this.age}
  i am from ${this.address.permanent_address} and my current adress is ${this.address.current_address} my
  phone is ${value}`
  let arrvalue=arr
  
  return [obj ,arrvalue]
}
console.log(applymethod.apply(arr2,[78945]))


let arr=[1,20,3,4,5]
let arr2 = {
    firstname: "kunal",
    lastname: "das",
    age: 25,
    address: {
        current_address: { name: "Bengaluru" },
    },
    permanent_address: {
        name: "dhanbad"
    }
};

function applymethod(value){
  let obj=`hello my firstname is ${this.firstname} and my name is ${this.lastname} my age is ${this.age}
  i am from ${this.address.permanent_address} and my current adress is ${this.address.current_address} my
  phone is ${value}`
  let arrvalue=arr
  
  return [obj ,arrvalue]
}
const bind_func=applymethod.bind(arr2)
console.log(bind_func(78954))


//output based question & answer 
let person={name:"kunal das"}
function personfullname(value){
  return `my name is ${this.name} my age is ${value}`
}
console.log(personfullname.call(person,24))
console.log(personfullname.bind(person,24))
console.log(personfullname.apply(person,[24]))
const bindmtod=personfullname.bind(person)
console.log(bindmtod(24))

Output:

my name is kunal das my age is 24
[Function: bound personfullname]
my name is kunal das my age is 24
my name is kunal das my age is 24


const person={
  name:"kunal das",
  age:25,
  getage:function(){
    return this.age
  }
}
const person2={age:20}
console.log(person.getage.call(person2))
console.log(person.getage())

Output:

20
25


var status = "✔️";

setTimeout(function() {
  const status = '🗑️';
  const data = {
    status: "➕",
    getstuts: function() {
      return this.status;
    }
  };

  console.log(data.getstuts());         // ✅ ?
  console.log(data.getstuts.call(this)); // ✅ ?
}, 0);


const data=[
  {name:"dog",sound:"bok"},{name:"cat",sound:"meow"}
  ]
  
  function result(){
    this.print=function(){
      console.log(`# name:${this.name} and sound:${this.sound}`)
    }
    this.print()
  }
 
  for (let i=0;i<data.length;i++){
     console.log(result.call(data[i]))
  }

//apend data
const data=["a","b"]
const res=[1,23,2]
data.push(res)
data.push.apply(data,res)
console.log(data)


//find min /max
const arr = [10, 30, 90, 50, 60];

let res = Math.max.apply(null, arr);
console.log(res); // 90
