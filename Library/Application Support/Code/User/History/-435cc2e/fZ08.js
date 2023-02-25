function scope(){
  const inside = "I am in function";
  console.log(inside + " - first console log");
  console.log(outside + " - first console log for outside");
}
const outside = "I am global";
scope();


console.log(outside + " - second console log");

console.log(inside + " - third console log");