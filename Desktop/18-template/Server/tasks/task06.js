const common = require("../common.js");
const operation = require("../operation.js");

function task(employees) {
    
    //Validacni podminka jestli vtupni peromenna odkazuje na pole a ma alespon jeden prvek
    if (!Array.isArray(employees) || employees.length===0) return "Zamestnanci nejsou definováni."

    console.log(common.dtoOutNames.names.all);
    employees.forEach(element => {
        
        
        if (element.firstName in common.dtoOutNames.names.all) {
            common.dtoOutNames.names.all[element.firstName] += 1;        
        } else {        
            common.dtoOutNames.names.all[element.firstName]=1;
            
        }
        
    
    });
    
    /*
        common.dtoOutNames.names.all = frequency.sort(function(a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
    });
    */
    console.log(common.dtoOutNames.names.all)
    return JSON.stringify(common.dtoOutNames);
}

module.exports = { task }