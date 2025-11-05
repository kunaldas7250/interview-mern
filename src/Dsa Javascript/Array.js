// Array Basic
// 🟢 Basic







// Rotate an array by k positions (cyclic rotation)



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
