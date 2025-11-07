// Array Basic
// 🟢 Basic
function power(a,b){
  if(b===0){
    return 1
  }
  return  a * power(a,b-1)
}
let a=6 
let b=3 
console.log(power(a,b))


function Lcm(num1, num2) {
  // Step 1: Find HCF
  let hcfValue;
  for (let i = 1; i <= num1 && i <= num2; i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      hcfValue = i;
    }
  }

  // Step 2: Use formula to find LCM
  let lcmValue = (num1 * num2) / hcfValue;
  return lcmValue;
}

const num1 = 36;
const num2 = 60;
console.log(Lcm(num1, num2));







function hcf(arr,arr2){
  let hcfvalue
  for(let i=1;i<=arr && i<=arr2;i++){
    if(arr%i==0 && arr2%i==0){
      hcfvalue=i
    }
  }
  return hcfvalue
}
const num1=36
const num2=60
console.log(hcf(num1,num2))






function odd(){
  const number=50
  for(let i=0;i<=number;i++){
    if(i%2!==0){
      console.log(i)
    }
  }
}
console.log(odd())




// // 1-Find the largest element in an array
const arr=[10,20,90,30,50,80]
const arr2=[]
let largest=arr[0]
for(let i=1;i<arr.length;i++){
    if(arr[i]>largest){
        largest=arr[i]
    }
}
arr2.push(largest)
console.log(arr2)

//2- Find the smallest element in an array
const arr3=[2,10,20,1,90,30,50,80]
const arr4=[]
let smallest=arr3[0]
for(let i=1;i<arr3.length-1;i++){
    if(arr3[i]<smallest){
        smallest=arr3[i]
    }
}
arr4.push(smallest)
console.log(smallest)

//3- Reverse an array
var arr5 = [10, 20, 90, 30, 50, 80];

// Sort ascending first
const sorting = arr5.sort((a, b) => a - b);
console.log("Sorted:", sorting); // [10, 20, 30, 50, 80, 90]

// Reverse manually
for (let i = 0; i < Math.floor(sorting.length / 2); i++) {
  const swap = sorting[i];
  sorting[i] = sorting[sorting.length - 1 - i];
  sorting[sorting.length - 1 - i] = swap;
}

console.log("Reversed:", sorting);


//// 4- Count even and odd numbers in an array
 const arr6=[10, 20,25,13, 90, 30, 50, 80];
let even=0
let odd=0
 for (let i=0;i<arr6.length;i++){
    if(arr6[i]%2===0){
      even++;
    }
    else{
       odd++
    }
 }
 console.log("Even count:", even); // 6
console.log("Odd count:", odd); 

// 6-Find the sum of all elements in an array
const arr7=[10, 20,25,13, 90, 30, 50, 80];
let sum=0
for(let i=0;i<arr7.length;i++){
    sum+=arr7[i]
}
console.log("Sum:", sum);


// 7-Find the second largest element
const arr8=[10, 20,25,13, 90, 30, 50, 80];
let largestelemnt=arr8[0]
for (let i=1;i<arr8.length;i++){
    if(arr8[i]>largestelemnt){
        largestelemnt=arr8[i]
    }
}
let secondlargestelemnt=-Infinity
for (let i=0;i<arr8.length;i++){
if(arr8[i]>secondlargestelemnt && arr8[i]<largestelemnt){
    secondlargestelemnt=arr8[i]
}
}
console.log(`hello second largest: ${secondlargestelemnt}`)

// 8-Find duplicate elements in an array
const arr9=[10,20,20,30,40,40]
const duplicate=[]
let count=0
for(let i=0;i<arr9.length;i++){
    if(arr9[i]===arr9[i+1]){
        count++
        duplicate.push(arr9[i])
    }
}
console.log("duplicate",duplicate)
console.log("count",count)

////9- Find the frequency of elements in an array
const arr10=[10, 20, 10, 30, 20, 10];
let cout10=10
let count20=20
let count30=30
let count_10=0
let count_20=0
let count_30=0
for(let i=0;i<arr10.length;i++){
    if(arr10[i]===cout10){
count_10++
    }
    if(arr10[i]===count20){
count_20++
    }
    if(arr10[i]===count30){
count_30++
    }
}
console.log("count 10",count_10)
console.log("count 20",count_20)
console.log("count 30",count_30)

// 10 - Find missing number in an array (1 to n)
const arr11 = [1, 2, 4, 5]; // missing = 3
const n = 5; // we expect numbers from 1 to 5

let xorAll = 0;
let xorArr = 0;

// XOR all numbers from 1 to n
for (let i = 1; i <= n; i++) {
  xorAll ^= i;
}

// XOR all elements of the array
for (let num of arr11) {
  xorArr ^= num;
}

// Missing number
const missing = xorAll ^ xorArr;
console.log("Missing number:", missing); // 3


//Sort array which consists of 
//0,1 and 2 without using any sorting algo


function sortarray(arr){
  let count0=0
  let count1=0
  let count2=0
  
  for(let i=0;i<arr.length;i++){
    if(arr[i]===0){
      count0++
     
    }else if(arr[i]===1){
      count1++
      
    }
    else{
      count2++
      
    }
  }

  for(let i=0;i<arr.length;i++){
    if(count0>0){
      arr[i]=0 
      count0--
    }else if(count1>0){
      arr[i]=1 
      count1--
    }else{
      arr[i]=2 
      count2--
    }
  }
  return arr
}
const arr=[1, 2, 0, 2, 1, 0, 2, 1, 0, 2, 0, 1]
console.log(sortarray(arr))


//Move all the negative elements to one side of the array
function movearray(arr){
  let j = 0;
 for(let i=0;i<arr.length;i++){
   if(arr[i]<0){
     let temp=arr[i]
     arr[i]=arr[j]
     arr[j]=temp
     j++
   }
   }
   return arr
}
const arr=[1, 3, -1, 4, -3, -5, -6, 3, 7]
console.log(movearray(arr)) // output [-6, -5, -3, -1, 1, 3, 3, 4, 7]



// 1 to n prime number
function prime(){
  const n=50
  let prime=[]
  for (let i=2;i<=n;i++){
   let isprime= true
    for(let j=2;j<=Math.sqrt(i);j++){
      if(i%j===0){
        isprime =false
        break
      }
    }
    if (isprime){
      prime.push(i)
    }
  }
  return prime
}
console.log(prime())


//check prime number or not 
function prime(){
  let n=10
  let number=5
  let isprime=true
  if(number<2){
    return isprime =false
  }else{
    for(let i=2;i<=Math.sqrt(number);i++){
      if(number%i==0){
        return isprime=false 
        break
      }
    }
  }
  if(isprime){
    console.log(`${number} is prime`)
  }
  else{
    console.log(`${number} is not prime `)
  }
}

prime()



//Remove duplicates from an array.
function Removeduplicate(arr){
  const copy=[...arr]
  const fresharr=[]
  
  for(let i=0;i<copy.length;i++){
    let isduplicates=false
    for(let j=0;j<fresharr.length;j++){
      if(copy[i]===fresharr[j]){
        isduplicates=true
        break
      }
    }
    if(!isduplicates){
      fresharr.push(copy[i])
    }
  }
  return fresharr
}
const arr=[10,10,50,30,70,60,30,40,50]
console.log(Removeduplicate(arr))




function frequency(str) {
  const slt = str.split("");
  let countH = 0,
      countE = 0,
      countL = 0,
      countO = 0,
      countW = 0,
      countR = 0,
      countD = 0;

  for (let i = 0; i < slt.length; i++) {
    if (slt[i] === "h") countH++;
    else if (slt[i] === "e") countE++;
    else if (slt[i] === "l") countL++;
    else if (slt[i] === "o") countO++;
    else if (slt[i] === "w") countW++;
    else if (slt[i] === "r") countR++;
    else if (slt[i] === "d") countD++;
  }

const result={
  h:countH,
  e:countE,
  l:countL,
  o:countO,
  w:countW,
  r:countR,
  d:countD
}
const sorted_keys=Object.keys(result).sort()
for(let keys of sorted_keys){
  console.log(`${keys}: ${result[keys]}`);

}
}

const str = "hello world";
frequency(str);
