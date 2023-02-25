function getEmployees(dtoIn, people) {
    let employees = []              
    for(let i=0;i<dtoIn.count;i++) {
        let gender = Math.floor(Math.random() * 2)
        employees.push(getEmployee(dtoIn, people))
    }    
    return employees
}

function getEmployee(dtoIn, people) {

     let newEmployee = { 
                        gender: "",
                        birthdate: "",
                        firstName: "",
                        lastName: "",
                        workload: 0,
                        age: 0
                    };
    
    //Nahoda zda se bude generovat muz nebo zene :)
    let genderRandom = Math.floor(Math.random() * 2)
    //Podle predchoziho nahodne vybere jmeno a prijmeni
    if (genderRandom===0) {
        newEmployee.firstName = people.men.firstNames[Math.floor(Math.random() * people.men.firstNames.length)];
        newEmployee.lastName = people.men.lastNames[Math.floor(Math.random() * people.men.lastNames.length)];
    } else {
        newEmployee.firstName = people.women.firstNames[Math.floor(Math.random() * people.women.firstNames.length)];
        newEmployee.lastName = people.women.lastNames[Math.floor(Math.random() * people.women.lastNames.length)];
    }
    newEmployee.gender = (genderRandom===0) ? "M" : "Z"; 
    //podle cstupu ve srtrikture common.fdtoIn se zvoli nahodne cislo v rozsahu min a max
    newEmployee.age = Math.floor(Math.random() * (dtoIn.age.max - dtoIn.age.min + 1) + dtoIn.age.min); 

    //Vybere nahodne z pole polozku z uvazkem viz modul common objekt people
    newEmployee.workload = people.workloads[Math.floor(Math.random() * people.workloads.length)];
    
    return newEmployee;
}

module.exports = { getEmployees }