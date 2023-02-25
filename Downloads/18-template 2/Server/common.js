let people = {
    men : {
        firstNames : ["Martin", "Adam", "Vladimír", "Lukáš"],
        lastNames : ["Přibyl", "Novák", "Kovář"] 
        },
    women : {
        firstNames : ["Klára", "Tereza", "Anna", "Veronika"],
        lastNames : ["Nováková", "Adamcová", "Zemanová", "Beránková"]
    },
    workloads : [10,20,30,40]
};

const dtoIn = {
    count:50,
    age:{
            min:19,
            max:35
        }
    };

    const dtoOut = {
        total: 0,
        workload10: 0,
        workload20: 0,
        workload30: 0,
        workload40: 0,
        averageAge: 0,
        minAge: 0,
        maxAge: 0,
        medianAge: 0,
        medianWorkload: 0,
        averageWomenWorkload: 0,
        sortedByWorkload: [
        ]
      };

      const dtoOutNames = {
        names: {
          all: {}
        }
    }

      

function test(){
    console.log("OK");
}

module.exports = {test, people, dtoIn, dtoOut, dtoOutNames}