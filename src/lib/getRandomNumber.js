function uniqueRandomNumbers(count, min, max) {
    if (count > max - min + 1 || count < 0) {
      throw new Error("Invalid range or count");
    }
  
    const result = [];
    while (result.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }
  
    return result;
  }
  

  module.exports = {uniqueRandomNumbers};