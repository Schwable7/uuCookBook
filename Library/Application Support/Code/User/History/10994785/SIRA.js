
let firstName = window.prompt("Enter your first name:");
let lastName = window.prompt("Enter your last name:");
console.log(`Your full name is ${firstName} ${lastName}.`);
if (firstName.length === lastName.length) {
  console.log("That's interesting, your first name has the same length as your last name.");
  // more than just one statement could be here
}