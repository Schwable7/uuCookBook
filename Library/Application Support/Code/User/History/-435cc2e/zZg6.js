function helloSomeone(name) {
  console.log("Hello " + name);
}

helloSomeone("Bob"); // Hello Bob
helloSomeone(); // Hello undefined

function helloEveryone(name = "Everyone") { //It is definition of the function with default value 
  console.log("Hello " + name);
}

helloEveryone("Bob"); // Hello Bob
helloEveryone(); // Hello Everyone