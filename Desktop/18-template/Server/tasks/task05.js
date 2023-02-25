const common = require("../common.js");
const operation = require("../operation.js");

function task(employees) {
    
    //Validacni podminka jestli vtupni peromenna odkazuje na pole a ma alespon jeden prvek
    if (!Array.isArray(employees) || employees.length===0) return "Zamestnanci nejsou definováni."

    frequency = [];

    let find=null;
    employees.forEach(element => {
        find = frequency.find(item => item.firstName === element.firstName);
        if (!find) {
            let nameCount = {
                firstName : element.firstName,
                count : 1
            }
            frequency.push(nameCount);
        } else {        
            find.count +=1;
        }
        
    });
    
    common.dtoOutNames.names.all = frequency.sort(function(a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
    });
    
    return JSON.stringify(common.dtoOutNames);
}

module.exports = { task }