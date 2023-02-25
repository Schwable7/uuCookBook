function genStudents() {
    const countStudents = Math.floor(Math.random() * 9)
    let students = new Array()
    for(let i = 0; i<countStudents;i++) {
        students.push(getStudent())
    }
    console.log(students)
    return students
}


function getStudent(firstNames, lastNames) {
    const firstNamesMax = firstNames.length
    const lastNamesMax = lastNames.length
    let student = { "firstName":firstNames[Math.floor(Math.random() * firstNamesMax)]
        , "lastName": lastNames[Math.floor(Math.random() * lastNamesMax)] }
    return student
}

module.exports = { genStudents }