// function outer(){
//     let name="kunal"
//     function inner(){
//       return {outer:name,inner:name}
//     }
//  return {inner}
// }
// var result=outer()
// console.log(result.inner())

// function outerfunction(){
//     let name="riku"
//     let count=10
//     count++
//     for(var i of "kunal"){
//         console.log(i)
//     }
//     function innerfunction(){
//         return {name,count,lastChar: i}
//     }
//     return {inner:innerfunction}
// }
// resu4=outerfunction()
// console.log(resu4.inner())

console.log("array method")
// 1. Find first even number
const numbers = [3, 7, 8, 15, 20];
const  evennumber=numbers.find((i)=>{
    return i%2===0
})
console.log(evennumber)

// 2. Find a student with marks > 80
const students = [
  { name: "Kunal", marks: 75 },
  { name: "Riku", marks: 85 },
  { name: "Das", marks: 60 },
  {name:"xyx",marks:90}
];

const result=students.find((i)=>{
     return i.marks>80
})
console.log(result)
const result2=students.findIndex((iteam,index)=>{
    return iteam.marks>80
})
console.log(result2)
const result3=students.filter((iteam,index)=>{
    return iteam.marks>80
})
console.log(result3)

// 3. Find first negative number
const arr = [5, 10, -3, -7, 20];
const negative=arr.find((i)=>{
     return i<0
})
console.log(negative)
const negative2=arr.findIndex((iteam,index)=>{
    return iteam<0
})
console.log(negative2)
const negative3=arr.filter((i)=>{
    return i<0
})
console.log(negative3)

// 4. Find product by ID
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" }
];
const findindex=products.find((i)=>{
     return i.id===3
})
console.log(findindex)

// 5. Find first string longer than 5 characters
const words = ["hi", "hello", "world", "JavaScript"];
const findlength=words.find((i)=>i.length>5)
console.log(findlength)

// 6. Find index of first odd number
const numberss = [4, 6, 8, 11, 14];
const findodd=numberss.findIndex((i)=>i%2!==0)
console.log(findodd)

// 7. Find index of student with marks < 70
const studentss = [
  { name: "Kunal", marks: 90 },
  { name: "Riku", marks: 65 },
  { name: "Das", marks: 82 }
];
const lessermarks=studentss.filter((iteam,index)=>{
    return iteam.marks<70
})
console.log(lessermarks)
const lessermarks2=studentss.find((i)=>i.marks<70)
console.log(lessermarks2)
const lessermarks3=studentss.findIndex((i)=>i.marks<70)
console.log(lessermarks3)

// 8. Find index of first negative number
const arrs = [10, 20, -5, -8, 15];
const negativeindexs=arrs.findIndex((i)=>i<0)
console.log(negativeindexs)

// 9. Find index of product named "Tablet"
const productss = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" }
];
const findproduct=productss.filter((iteam,index)=>{
   return  iteam.name==="Tablet"
})
console.log(findproduct)
const findproduct2=productss.find((i)=>i.name==="Tablet")
console.log(findproduct2)

// 10. Find index of first word with length 4
const wordse = ["hi", "love", "code", "react"];
const indexfind=wordse.findIndex((i)=>i.length===4)
console.log(indexfind)
const indexfind2=wordse.find((i)=>i.length===4)
console.log(indexfind2)


//indexof and lastindexof
//Find the index of an element in an array
const arrk = [10, 20, 30, 40];
console.log(arrk.indexOf(20,0))
//Check if a value exists in an array using indexOf
const arrl = ["apple", "banana", "mango"];
const reult6="apple"
console.log(arrl.indexOf(reult6)!==-1?"found":"notfound")

//Find the index of a character in a string
const str2 = "javascript";
console.log(str2.indexOf("s"))
//Find the last occurrence of a character in a string
console.log(str2.lastIndexOf("t"))

//Check if a substring exists in a string using indexOf
const sentence = "I love programming in JavaScript";
console.log(sentence.indexOf("love")!==1?"found":"not")

//Find all occurrences of a character in a string
const data = "bannaa";
const char = "a";
const positions = [];
const position2 = [];

// Method 1: for loop
for (let i = 0; i < data.length; i++) {
  if (data[i] === char) {
    positions.push(i);
  }
}
console.log(`postion:${positions}`); // [1, 4, 5]

// Method 2: while loop with indexOf
let result8 = data.indexOf(char);
while (result8 !== -1) {
  position2.push(result8);
  result8 = data.indexOf(char, result8 + 1); // update to find next index
}
console.log(`postion2:${position2}`); // [1, 4, 5]
