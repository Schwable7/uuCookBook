function getAverage(employees){
    
    //Validacni podminka jestli vtupni peromenna odkazuje na pole a ma alespon jeden prvek
    if (!Array.isArray(employees) || employees.length===0) return "Zamestnanci nejsou definováni."

    
    let sum=0;
    let count = 0;
    employees.forEach(element => {
        sum = sum + element.age;
        count +=1;
    });

    return (sum/count).toString()
    
}

function median(numbers) {
    // Sort the numbers in ascending order
    numbers.sort((a, b) => a - b);
  
    // If the number of numbers in the set is odd, the median is the middle number
    if (numbers.length % 2 === 1) {
      return numbers[Math.floor(numbers.length / 2)];
    }
    
    // If the number of numbers in the set is even, the median is the average of the two middle numbers
    const middleIndex = numbers.length / 2;
    return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
  }





module.exports = {getAverage, median}