function helloSomeOne(firstName, lastName = "Smith", age = 15) {
  console.log("Hello " + firstName + " " + lastName + ", you are " + age + " years old.");
}

helloSomeOne("John"); 
helloSomeOne("John", undefined, 16);