const common = require("../common.js");
const operation = require("../operation.js");

function task(employees) {
    
    //Validacni podminka jestli vtupni peromenna odkazuje na pole a ma alespon jeden prvek
    if (!Array.isArray(employees) || employees.length===0) return "Zamestnanci nejsou definováni."

    let sum=0;
    let sumW=0;
    let count = 0;
    let countW = 0;
    common.dtoOut.minAge = null;
    common.dtoOut.maxAge = null;
    medianAges = [];
    medianWorkloads = [];

    employees.forEach(element => {
        
        sum = sum + element.age;
        if (element.gender === "Z") { sumW += element.age; countW += 1;   };
        count +=1;

        if (element.workload===10) {
            common.dtoOut.workload10 += 1;
            medianWorkloads.push(10);
        } else if (element.workload===20) {
            common.dtoOut.workload20 += 1;
            medianWorkloads.push(20);
        } else if (element.workload===30) {
            common.dtoOut.workload30 += 1;
            medianWorkloads.push(30);
        } else if (element.workload===40) {
            common.dtoOut.workload40 += 1;
            medianWorkloads.push(40);
        }
    
        (common.dtoOut.minAge === null || common.dtoOut.minAge>element.age ) ? common.dtoOut.minAge = element.age : false;
        (common.dtoOut.maxAge === null || common.dtoOut.maxAge<element.age ) ? common.dtoOut.maxAge = element.age : false;
        
        medianAges.push(element.age);
        
        
    });

    common.dtoOut.total=count;
    common.dtoOut.averageAge=sum/count;
    if (countW>0) common.dtoOut.averageWomenWorkload = sumW/countW;

    common.dtoOut.medianAge = operation.median(medianAges);
    common.dtoOut.medianWorkload = operation.median(medianWorkloads);

    common.dtoOut.sortedByWorkload = employees.sort(function(a, b) {
        return parseFloat(a.workload) - parseFloat(b.workload);
    });
    
    return JSON.stringify(common.dtoOut);
}

module.exports = { task }