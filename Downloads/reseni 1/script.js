function randomFromArrey(arrey) {
    return arrey[Math.floor((Math.random() * arrey.length))];
}

function randomBirthdate(minage, maxage) {
    const dateNow = new Date()
    //let minBirthdate = new Date(dateNow.getFullYear()- maxage, dateNow.getMonth(),dateNow.getDate());
    //minBirthdate.setFullYear(dateNow.getFullYear()- maxage)
    let minBirthdate = new Date();
    minBirthdate.setFullYear(dateNow.getFullYear()- maxage)
    let maxBirthdate = new Date();
    maxBirthdate.setFullYear(dateNow.getFullYear()- minage)
    
    //let minBirthdate = new Date().setFullYear(dateNow.getFullYear() - maxage);
    //console.log(minBirthdate.toISOString())
    //let maxBirthdate = new Date(new Date().setFullYear(new Date().getFullYear() - minage));
    let difference = maxBirthdate.getTime() - minBirthdate.getTime();
    return new Date(minBirthdate.getTime() + Math.floor(Math.random() * difference)).toISOString();
}

function main(dtoIn) {
    const maleName = ["Jiří", "Jan", "Petr", "Pavel", "Jaroslav", "Martin", "Tomáš", "Miroslav", "František", "Josef", "Štěpán", "Václav", "Michal", "Karel", "Milan", "Vladimír", "David", "Jakub", "Lukáš", "Ladislav", "Stanislav", "Roman", "Ondřej", "Radek", "Marek", "Daniel", "Miloslav", "Vojtěch", "Filip", "Jaromír", "Ivan", "Aleš", "Oldřich", "Libor", "Rudolf", "Jindřich", "Miloš", "Adam", "Lubomír", "Patrik", "Dominik", "Bohumil", "Luboš", "Robert", "Radim", "Richard", "Ivo", "Luděk", "Bohuslav", "Alois"];
    const femaleName = ["Marie", "Jana", "Eva", "Anna", "Hana", "Věra", "Lenka", "Alena", "Jaroslava", "Lucie", "Petra", "Kateřina", "Helena", "Ludmila", "Jitka", "Jarmila", "Veronika", "Martina", "Jiřina", "Michaela", "Tereza", "Vlasta", "Monika", "Zuzana", "Markéta", "Marcela", "Dagmar", "Božena", "Libuše", "Dana", "Růžena", "Marta", "Barbora", "Miroslava", "Eliška", "Irena", "Kristýna", "Pavla", "Olga", "Milada", "Andrea", "Iveta", "Pavlína", "Šárka", "Zdeňka", "Zdenka", "Blanka", "Nikola", "Renáta", "Renata"];
    const maleSurname = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Krejčí", "Němec", "Horák", "Marek", "Pospíšil", "Pokorný", "Beneš", "Fiala", "Hájek", "Král", "Jelínek", "Růžička", "Sedláček", "Doležal", "Zeman", "Kolář", "Navrátil", "Čermák", "Blažek", "Kříž", "Bartoš", "Vlček", "Polák", "Musil", "Kovář", "Kratochvíl", "Kopecký", "Šimek", "Konečný", "Vaněk", "Urban", "Malý", "Holub", "Čech", "Štěpánek", "Staněk", "Kadlec", "Dostál", "Soukup", "Šťastný", "Mareš", "Moravec"];
    const femaleSurname = ["Nováková", "Procházková", "Svobodová", "Kučerová", "Novotná", "Veselá", "Dvořáková", "Černá", "Horáková", "Pokorná", "Pospíšilová", "Němcová", "Marková", "Hájková", "Králová", "Jelínková", "Růžičková", "Benešová", "Sedláčková", "Doležalová", "Zemanová", "Fialová", "Kolářová", "Navrátilová", "Šimková", "Blažková", "Křížová", "Kopecká", "Čermáková", "Konečná", "Holubová", "Vaňková", "Urbanová", "Kratochvílová", "Kovářová", "Bartošová", "Vlčková", "Poláková", "Musilová", "Čechová", "Malá", "Staňková", "Štěpánková", "Šťastná", "Kadlecová", "Dostálová", "Soukupová", "Marešová", "Vávrová", "Tichá"];
    const posibleWorkload = [10, 20, 30, 40];
    let unbornEmployees = dtoIn.count;
    let dtoOut = [];
    while (unbornEmployees > 0) {
        let employee = {
            gender: randomFromArrey(["male", "female"]),
            birthdate: randomBirthdate(dtoIn.age.min, dtoIn.age.max),
            workload: randomFromArrey(posibleWorkload)
        };
        if (employee.gender === "male") {
            employee.name = randomFromArrey(maleName);
            employee.surname = randomFromArrey(maleSurname);
        }
        else {
            employee.name = randomFromArrey(femaleName);
            employee.surname = randomFromArrey(femaleSurname);
        }
        dtoOut.push(employee)
        unbornEmployees -= 1;
    }
    return dtoOut;
}