
// Intermediate Array


// Find intersection of two arrays

// Find union of two arrays

// Find majority element (> n/2 times)

// Maximum subarray sum (Kadane’s algorithm)

// Find subarray with given sum

// Find pairs with given sum

// Find triplet with given sum

// Rearrange array in alternating positive & negative numbers


// 1-Move all zeros to the end
const arr=[0, 1, 0, 3, 12]
let pos=0
for(let curr=0;curr<arr.length;curr++){
    if(arr[curr]>0){
        arr[pos]=arr[curr]
         pos++
    }
}
console.log("pos",pos)
for(let i=pos;i<arr.length;i++){
    arr[i]=0
}
console.log(arr)

// 2-Sort array of 0s, 1s, and 2s (Dutch national flag problem)
const arr2=[0, 2, 1, 2, 0, 1, 0]
let count=0
let count2=0
let cout3=0
for(let i=0;i<arr2.length;i++){
    if(arr2[i]===0){
        arr2[count]=[arr2[count],arr2[count2],arr2[cout3]]
        count++
        count2++
        cout3++
    }
    else if(arr2[i]===1){
        [arr2[count2]]=[arr2[count2],arr2[cout3]]
        count2++
        cout3++
    }
    else{
        arr2[cout3]=arr2[cout3]
        cout3++
        
    }
}
