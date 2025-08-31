var a=["kunal","das","riku","kd"]
// var f=a.push("done")
// console.log(` i am here ${f}`)
// // var r=a.unshift("shift")
// // console.log(` i am shift ${r}`)
// // var y=a.shift()
// // console.log(` i am shift ${y}`)
// // var p=a.pop()
// // console.log(`i am pop ${p}`)
// var s=a.splice(2,2,"come","new")
// console.log(` i am splice ${s}`)
// console.log(` check your array ${a}`)
// var c={
//     a:["kunal","das","riku","kd"],
//     b:["tiu","srm","mains","uem"]
// }
// // var d=c.a.slice(1,3)
// // console.log(d)
// // var e=c.b.slice(0,3)
// // console.log(e)
// // var b=a.slice(1,3)
// // console.log(b)
// const add=c.b.splice(1,0,"cv","global")
// console.log(add)
// console.log(c.b);
// const delte=c.b.splice(2,2)
// console.log(delte)
// console.log(`updated array ${c.b}`);

// const arr=[1,5,8,9,2,6]


// result5=arr.sort()
// console.log(result5)
//  console.log(arr.sort().reverse())
// console.log(arr.reverse())

// const book=[4,5,6,7,6]
// console.log(book.prototype)
// const result10=[...book].sort()
// const result11=book.slice().sort()
// const result12=book.slice().reverse()
// const result13=[...book].reverse()
// console.log(`${book} your original array`)
// console.log(`${result10} sorted with spread operator`)
// console.log(`${result12} sortded with splice`)
// console.log(`${result11} sorted with splice`)
// console.log(`${result13} sorted with spread`)

// // function
// const fruits=["apple","banna","mango","grapes","watermelon"]
// fruits.forEach((iteam,index)=>{
//     console.log(`${index+1} -${iteam}`)
// })

// for(var fruit in fruits){
//     // console.log(`${fruits}[fruit]`)
//     console.log(fruits[fruit])
// }
// for (var i of fruits){
//     console.log(i)
// }
// for (var i of "kunal"){
//     console.log(i)
// }

// const numbers = [1, 2, 3, 4, 5];
// numbers.forEach((iteam,index)=>{
// console.log(`Index ${index}: square = ${iteam * iteam}`);
// })

// for(var i of numbers){
//     if(i%2===0){
//         console.log(i)
//     }
//     else{
//         console.log(`sorry`)
//     }
// }

// const student = { name: "Kunal", age: 22, grade: "A" };
// for (var i in student){
//     console.log(`${i}:${student[i]}`)
// }

function outer() {
    let name = "kunal";

    function inner() {
        let name2 = "riku";
        console.log("Outer:", name);
        console.log("Inner:", name2);
    }

    return inner; // return inner function
}

const result = outer();  // outer returns inner
result();  // call inner


function outer2(params) {
    let count=10
    let naam="i am parent"
    function increment(){
        let naam2="i am increment"
        return {naam2,count:count++}
    }
    function decrement(params) {
        let naam3="i am decremnt"
        return {naam3,count:count--}
    }
    function getvalue(params) {
        let naam4="i am get value"
        return {naam4,count}
    }
    return {naam,increment,decrement,getvalue}
}
const result2 = outer2();

console.log(result2.increment()); // 10
console.log(result2.increment()); // 11
console.log(result2.decrement()); // 11
console.log(result2.getvalue());  // 10


function timeout() {
    let time = 0;
    let name = "hi i am timer";
    let intervalid;

    intervalid = setInterval(() => {
        time++;
        console.log({ name, time });
    }, 1000);

    function stop() {
        clearInterval(intervalid);
        console.log(`Timer stopped at: ${time}`);
    }

    function getvalue() {
        return { name, time };
    }

    // return public methods
    return { stop, getvalue };
}

const result3 = timeout();

setTimeout(() => {
    result3.stop(); // stops after 5 sec
    console.log(result3.getvalue()); // final value
}, 5000);
