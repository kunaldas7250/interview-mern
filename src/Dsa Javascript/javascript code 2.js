let palindrome = (a) => {
    let store = [...a]; 

    
    for (let i = 0; i < Math.floor(store.length / 2); i++) {
        const swap = store[i];
        store[i] = store[store.length - 1 - i];
        store[store.length - 1 - i] = swap;
    }

    if (store.join("") === a) {
        return "palindrome";
    } else {
        return "not palindrome";
    }
};

console.log(palindrome("mom")); 
console.log(palindrome("cat")); 
console.log(palindrome("dog")); 


let findmax=(a)=>{
    if(a.length===0) return 
    let max=a[0]
    for(let i=1;i<a.length;i++){
        if(a[i]>max){
            max=a[i]
        }
    }
    return max
}
console.log(findmax([10,20,50,90,30]))
console.log(findmax([-10,-20,-50,-90,-30]))
console.log(findmax([10]))

function factorial(a){
    if(a===0){
        return 1
    }
    return a* factorial (a-1)
}
console.log(factorial(5))
console.log(factorial(2))
console.log(factorial(3))



const reverse_a_word = (str) => {
  let res = str.split(""); // convert string to array

  for (let i = 0; i < Math.floor(res.length / 2); i++) {
    let temp = res[i];
    res[i] = res[res.length - 1 - i];
    res[res.length - 1 - i] = temp;
  }

  return res.join(""); // convert back to string
};

console.log(reverse_a_word("my name is kunal das"));

const Mergesort=(a,b)=>{
    let store=[]
    for(let i=0;i<a.length;i++){
        store.push(a[i])
    }
    for (let j=0;j<b.length;j++){
        store.push(b[j])
    }
    return store
}
const data1=[10,20,30]
const data2=[40,50,60]
console.log(Mergesort(data1,data2))


const fibnonic_seq=(n)=>{
    let a=0
    let b=1
    let result=[a,b]
    for(let i=2;i<n;i++){
       let next=a+b
       result.push(next)
       a=b
       b=next
    }
    return result
}
console.log(fibnonic_seq(5))


const compress_string=(n)=>{
    let count=1
    let store=""
    for (let i=0;i<n.length;i++){
            if(n[i]===n[i+1]){
                count++
        }else{
            store+=n[i]+(count>1?count:"")
            count=1
        }
    }
    return store
}
console.log(compress_string("aaaabbcfff"))// output a4b2cf3


const BinarySearch=(a,b)=>{
    let low=0
    let last=a.length-1
    for(let i=0;i<a.length;i++){
         let middle = Math.floor((low + last) / 2)
        if(b>a[middle]){
           for(let i=middle;i<last;i++){
               if(a[i]===b){
                    console.log(`Element ${b} found at index ${i}`);
                   return a[i]
               }
           } 
        }else{
            for(let i=low;i<middle;i++){
                if(a[i]===b){
                     console.log(`Element ${b} found at index ${i}`);
                    return a[i]
                }
            }
        }
    }
    console.log("Element not found");
}
const input=parseInt(prompt("enter you number:"))
console.log(BinarySearch([10,20,30,40,50,60],input))
