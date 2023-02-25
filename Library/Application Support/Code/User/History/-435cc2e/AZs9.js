function helloWorld() {
  return "Hello world from my function!";
}

console.log(helloWorld); //Will not print text but the link on function only 
let myFunc = helloWorld; //The funcion name without brackets is it link on function only but it will not call itself
console.log(myFunc()); //The function will be call If we do add brackets after variable with function