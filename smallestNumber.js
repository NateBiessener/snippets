//From CodeWars
// Requirements:
//
// You have a positive number n consisting of digits. You can do at most one operation: Choosing the index of a digit in the number, remove this digit at that index and insert it back to another place in the number.
//
// Doing so, find the smallest number you can get.
//
// Task:
//
// Return an array or a tuple depending on the language (see "Your Test Cases" Haskell) with
//
// 1) the smallest number you got
// 2) the index i of the digit d you took, i as small as possible
// 3) the index j (as small as possible) where you insert this digit d to have the smallest number.

//completed correct attempt
function smallest(n) {
  let numString = String(n);

  let shift = (string, from, to) => {
    let sliced = string.slice(0, from) + string.slice(from + 1, string.length);
    return sliced.slice(0, to) + string[from] + sliced.slice(to, sliced.length);
  };

  //time to brute force it
  let generateAnswer = (string, from, to) => {
    return [Number(shift(string, from, to)), from, to];
  };

  //produces a range from 0 - max, excluding max
  let makeRange = (max) => {
    if (max > 0) {
      return makeRange(max - 1).concat(max - 1);
    }
    return [];
  }

  let make2DRange = (max) => {
    return makeRange(max).map((x) => {
      return [x, makeRange(max)];
    })
  }

  let generateAllPossible = (string) => {
    let answers = [];
    let possibleIndices = make2DRange(string.length);
    possibleIndices.forEach((index)=>{
      let fromIndex = index[0];
      index[1].forEach((index)=>{
        let toIndex = index;
        answers.push(generateAnswer(string, fromIndex, toIndex));
      });
    });
    return answers;
  };
  let allPossible = generateAllPossible(numString);

  let smallestNumber = allPossible.reduce((x, y) => {
    return x[0] < y[0] ? x : y
  })[0];

  return allPossible
  .filter((x) => {
    return x[0] == smallestNumber;
  })
  .reduce((x, y) => {
    if (x[1] == y[1]){
      return y[2] < x[2] ? y : x;
    }
    return y[1] < x[1] ? y : x;
  });
}

//discarded attempt
//ran into issues with repeated digits and cases where the smallest number would be produced by moving a digit other than the right-most smallest digit
let wrong = (n) => {
  //if the whole thing is a repeating number such as 111, return self
  if (numString.split('')
      .reduce((x, y, current, self) =>
        {return (y == self[0] && x)}, true)) {
    return [n, 0, 0];
  }

  let shift = (string, from, to) => {
    let sliced = string.slice(0, from) + string.slice(from + 1, string.length);
    return sliced.slice(0, to) + string[from] + sliced.slice(to, sliced.length);
  };

  let getRightIndexOfSmallestDigit = (string, shift = 0) => {
    let splitString = string.slice(shift, string.length).split("");
    let smallestIndex = 0;
    splitString.reduce((x, y, index) => {
      if (y <= x) {
        smallestIndex = index;
        return y;
      }
      else {
        return x;
      }
    });
    if (splitString[smallestIndex] == splitString[0]) {
      shift += 1;
      return getRightIndexOfSmallestDigit(string, shift);
    }
    return smallestIndex + shift;
  };
  let smallestDigitIndex = getRightIndexOfSmallestDigit(numString);

  let getTargetIndex = (string, smallestDigitIndex) => {
    let splitString = string.split("");
    return splitString.reduce((acc, nextVal, currentIndex) => {
      if (splitString[acc] <= splitString[smallestDigitIndex]){
        return currentIndex;
      }
      return acc;
    }, 0);
  };
  let targetIndex = getTargetIndex(numString, smallestDigitIndex);

  let smallestNumber = Number(shift(numString, smallestDigitIndex, targetIndex));

  if (smallestNumber == Number(shift(numString, targetIndex, smallestDigitIndex))
  && targetIndex < smallestDigitIndex) {
    return [smallestNumber, targetIndex, smallestDigitIndex];
  }

  return [smallestNumber, smallestDigitIndex, targetIndex];
};
