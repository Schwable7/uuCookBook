function helloSomeOne(firstName, lastName = "Smith", age = 15) {
  console.log("Hello " + firstName + " " + lastName + ", you are " + age + " years old.");
}

helloSomeOne("John"); //Hello John Smith, you are 15 years old.
helloSomeOne("John", undefined, 16); //Hello John Smith, you are 16 years old.