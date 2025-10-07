function generateHashtag(data){
   let result=data.split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join("")
   const inc="#"
  result=inc+result
  
   return result
}
const input="my name is kunal das"
console.log(generateHashtag(input))


const countChar=(data1,data2)=>{
    let result1=data1.toLowerCase().trim()
    let result2=data2.toLowerCase().trim()
    let count=0
    for(let i=0;i<result1.length;i++){
        if(result1[i]===result2){
            count++
        }
    }
    return count
}
console.log(countChar("MissIssippi","I"))


let checkTraingleType=(a,b,c)=>{
    if(a===b && b===c ){
        console.log("equilateral")
    }else if(a===b||b===c||c===a||a===c){
        console.log("isoceles")
    }else{
        console.log("scalene")
    }
}
console.log(checkTraingleType(3,3,3))
console.log(checkTraingleType(3,4,3))
console.log(checkTraingleType(5,8,6))



let sortArray=(data)=>{
    const result=[...data]
    let temp;
    for(let i=0;i<result.length;i++){
       for(let j=i+1;j<result.length;j++){
            if(result[i]>result[j]){
                temp=result[i]
                result[i]=result[j]
                result[j]=temp
            }
       }
    }
    return result
}
console.log(sortArray([10,30,20,40,80,50]))
