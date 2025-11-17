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


//Count vowels in a string
function vowels(str){
  const result = str.split("");  // split characters
  let n = result.length;

  let counte = 0;
  let counta = 0;
  let counti = 0;
  let counto = 0;
  let countu = 0;

  for(let i = 0; i < n; i++){
    if(result[i] === "a"){
      counta++;
    }
    else if(result[i] === "e"){
      counte++;
    }
    else if(result[i] === "i"){
      counti++;
    }
    else if(result[i] === "o"){
      counto++;
    }
    else if(result[i] === "u"){
      countu++;
    }
  }

  return { a: counta, e: counte, i: counti, o: counto, u: countu };  
}

const name = "kunal";
console.log(vowels(name));


//Remove all vowels from a string
function remove_vowels(str){
  let result = str.split("");
  let n = result.length;
  let remove_vowels_container = [];

  let counte = 0;
  let counta = 0;
  let counti = 0;
  let counto = 0;
  let countu = 0;

  for(let i = 0; i < n; i++){
    if(result[i] === "a"){
      counta++;
    }
    else if(result[i] === "e"){
      counte++;
    }
    else if(result[i] === "i"){
      counti++;
    }
    else if(result[i] === "o"){
      counto++;
    }
    else if(result[i] === "u"){
      countu++;
    }
    else{
      remove_vowels_container.push(result[i]);  // push consonant
    }
  }

  return remove_vowels_container.join("");  // return string instead of array
}

const name = "kunal";
console.log(remove_vowels(name));


//Find the first non-repeating character
function reapting_charater(str){
  let result=str.split("")
  let n=result.length
  for(let i=0;i<n;i++){
    let reapting=false
    for(let j=0;j<n;j++){
      if(i!==j &&result[i]===result[j]){
        reapting=true
        break
      }
    }
    if(!reapting){
      return result[i]
    }
  }
  return null
}
const name="boobsk"
console.log(reapting_charater(name))
