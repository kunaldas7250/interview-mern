let timeoutId;

const debounceCode = (value) => {
  clearTimeout(timeoutId); 

  timeoutId = setTimeout(() => {
    console.log("Value:", value);
  }, 2000);
};

debounceCode("k");
debounceCode("ku");
debounceCode("kun");
debounceCode("kuna");
debounceCode("kunal");

let isthrottle
const throttling =(value)=>{
    if (isthrottle)return 
   
       isthrottle=true
        console.log("value",value)

setTimeout(()=>{
    isthrottle=false
},5000)
}
console.log(throttling("k"))
console.log(throttling("ku"))
console.log(throttling("kun"))
console.log(throttling("kuna"))
console.log(throttling("kunal"))
