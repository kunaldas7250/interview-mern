// 🟢 Basic

const { number } = require("framer-motion");





// Convert string to integer (atoi)

// Longest common prefix

//1- Reverse a string
const name = "koushik";
const arr = name.split("");

for (let i = 0; i < Math.floor(arr.length / 2); i++) {
  const swap = arr[i];
  arr[i] = arr[arr.length - 1 - i];
  arr[arr.length - 1 - i] = swap;
}

console.log(arr.join("")); // "lanuk"

// 2-Check if string is palindrome
const name2 = "";
const name3 = name2;
const arr2 = name3.split("");
console.log(arr2);
for (let i = 0; i < Math.floor(name3.length / 2); i++) {
  const swap = arr2[i];
  arr2[i] = arr2[arr2.length - 1 - i];
  arr2[arr2.length - 1 - i] = swap;
}
if (arr2.join("") === name2) {
  console.log("palidrome");
} else {
  console.log("not palidrome");
}

// 3-Count vowels and consonants
const str = "kunal";
const arr4 = str.split("");
let countVowel = 0; // ✅ use let
let countConsonant = 0; // ✅ use let

for (let i = 0; i < arr4.length; i++) {
  if (
    arr4[i] === "a" ||
    arr4[i] === "e" ||
    arr4[i] === "i" ||
    arr4[i] === "o" ||
    arr4[i] === "u"
  ) {
    countVowel++;
  } else {
    countConsonant++;
  }
}

console.log(`Vowels count: ${countVowel}`); // 2 (u, a)
console.log(`Consonants count: ${countConsonant}`); // 3 (k, n, l)

// 4-Find first non-repeating character
const str2 = "kunal";
const arr5 = str2.split("");
let repeat = null;

for (let i = 0; i < arr5.length; i++) {
  let isunique = true; // assume current char is unique

  for (let j = 0; j < arr5.length; j++) {
    if (i !== j && arr5[i] === arr5[j]) {
      isunique = false; // found duplicate
      break;
    }
  }

  if (isunique) {
    repeat = arr5[i]; // first non-repeating char
    break; // stop searching
  }
}

console.log(`First non-repeating character: ${repeat}`);

// 5-Remove duplicates from a string
const str3 = "aabbcc";
const arr6 = str3.split("");
console.log(arr6);

for (let i = 0; i < arr6.length; i++) {
  for (let j = i + 1; j < arr6.length; j++) {
    if (arr6[i] === arr6[j]) {
      arr6.splice(j, 1);
      j--;
    }
  }
}
console.log(arr6.join(""));

// 6-Check anagram of two strings
const str4 = "listens";
const str5 = "silensst";

const checkana = str4.split("");
const checkana2 = str5.split("");
let count = 0;
for (let i = 0; i < checkana.length; i++) {
  for (let j = 0; j < checkana2.length; j++) {
    if (checkana[i] === checkana2[j]) {
      count++;
      checkana2.splice(j, 1);
      break;
    }
  }
}
if (count === str4.length && checkana2.length === 0) {
  console.log("its anagram");
} else {
  console.log("its not anagram");
}


//7- Find all substrings of a string
const str7="abc"
//ab,bc,abc,a,b,c,ca

const res=[]
for(let i=0;i<str7.length;i++){
  for(let j=i+1;j<=str7.length;j++){
    res.push(str7.slice(i,j))
  }
}
console.log("sub string",res)

//8- Find length of string without using built-in
const str8="kunal"
let count2=0
for (let char of str8){
  count2++
console.log(` len:${char} count:${count2}`)
}



function textbox(str) {
  // Split the string into words
  const words = str.split(" ");
  
  // Map through each word
  const result = words.map(word => {
    // If word length > 0, uppercase its last letter
    const lastCharUpper = word[word.length - 1].toUpperCase();
    // Combine the rest of the word + last uppercase letter
    return word.slice(0, -1) + lastCharUpper;
  });

  // Join words back with spaces
  return result.join(" ");
}

const input = "netaxis it solutions";
console.log(textbox(input)); // ✅ Output: "kunaL daS"
