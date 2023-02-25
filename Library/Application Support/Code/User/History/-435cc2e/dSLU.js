function helloSomeone(name) {
  console.log("Hello " + name);
}

helloSomeone("Bob"); 
helloSomeone(); 

function helloEveryone(name = "Everyone") {  
  console.log("Hello " + name);
}

helloEveryone("Bob"); 
helloEveryone(); 