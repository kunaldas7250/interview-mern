//Reverse a string
function reverse(str){
  let result=""
  for(let i=str.length-1;i>=0;i--){
    result+=str[i]
  }
  return result
}
const name="kunal"
console.log(reverse(name))


//Check if a string is a palindrome
function palindrome(str){
  const copy=str
  const result=copy.split("")
  let flag=true
  for(let i=0;i<result.length;i++){
    let j=result.length-1-i
    if(result[i]!==result[j]){
      flag=false
      break
    }
  }
  if(flag==true){
    console.log("is palindrome")
  }
  else{
    console.log("not palindrome ")
  }
}
const name="abc"
console.log(palindrome(name))
