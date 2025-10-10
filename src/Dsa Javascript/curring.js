
// curring is a tranformin a function that takes multiple argument sequence function
const sum=(a)=>{
    return (b)=>{
        return (c)=>{
            return (d)=>{
                return a+b+c+d
            }
        }
    }
    
}
console.log(sum(1)(4)(3)(2))

const mul=(a)=>{
    if(a!==undefined ){
        return (b)=>{
            return (c)=>{
                return (d)=>{
                    return a*b*c*d
                }
            }
        }
    }
    else{
        return false
    }
}
console.log(mul(1)(4)(3)(2))


const test=(a)=>{
    const inner=(b)=>{
         if(b!==undefined ){
        return test(a+b)
    }
    else{
        return a
    }
    }
   return inner
}
console.log(test(1)(2)(3)(4)())

const test = a => b => b ? test(a + b) : a;

console.log(test(1)(20)(3)(40)()); 
