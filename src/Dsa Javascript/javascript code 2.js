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
