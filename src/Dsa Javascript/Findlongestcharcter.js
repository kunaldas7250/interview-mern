
const findWord = (data) => {
  const words = data.split(" ");
  console.log("words",words)// split sentence into words
  let store = words[0];          // start with first word

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > store.length) {
      store = words[i];
    }
  }

  return store;
};

const input = prompt("Enter your sentence:");
console.log("Longest word:", findWord(input));



const FindLongestWord = (data) => {
  if (typeof data === "string") {
    let longestChar = data[0]; 

    for (let i = 0; i < data.length; i++) {
      
        if (data[i] > longestChar) {
          longestChar = data[i];
        }
      
    }

    return longestChar;
  } else {
    return false;
  }
};


let input = prompt("Enter a string:");
console.log("Longest character:", FindLongestWord(input));
