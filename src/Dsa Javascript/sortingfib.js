// print the first N fibnonic numbers using javascript
const fibonicNumber = (n, arr) => {
  for (let i = 2; i < n; i++) {         // start from index 2
    const add_data = arr[i - 1] + arr[i - 2]; // sum of last two
    arr.push(add_data);                 
  }
  return arr;
};

let n = 5;
let arr = [0, 1];
const result = fibonicNumber(n, arr);
console.log(result); 

//Find factorial of a number.

const factorialnumber=(k)=>{
    let data=1
for (let i=1;i<n;i++){
     data*=i
}
return data
}
let k=4
const result2=factorialnumber(k)
console.log(result2)

//Merge two sorted arrays.
const merge_2_sorted_array=(data1,data2)=>{
let merge_array=[]

for(let i=0;i<data1.length;i++){
    merge_array.push(data1[i])
}
for(let j=0;j<data2.length;j++){
    merge_array.push(data2[j])
}
return merge_array
}
let data1=[1,2,3]
let data2=[4,5,6]
const reult=merge_2_sorted_array(data1,data2)
console.log(reult)