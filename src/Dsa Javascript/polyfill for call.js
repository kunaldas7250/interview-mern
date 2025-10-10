let car1 = {
  color: "red",
  car: "mahindra thar"
};

function purchaseCar(currency, price) {
  console.log(`I have purchased this ${this.color}-${this.car} car for ${currency}${price}`);
  return `Purchase Successful`;
}

Function.prototype.myfunc = function (context = {}, ...args) {
  if (typeof this !== "function") {   
    throw new Error("something went wrong");
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

console.log(purchaseCar.myfunc(car1, "💲", 50000000));
