//returns an array of the first [target] prime numbers, within memory limits
function calcPrimes(target){
  var primes = [2];
  for (; primes.length < target; /*push to primes in loop*/) {
    var i = primes[primes.length-1] + 1;
    while(true){
      var isPrime = true;
      //start at the number after the last prime
      for (var j = 0; j < primes.length; j++) {
        if (i % primes[j] === 0){
          isPrime = false;
          break;
        }//end if
      }//end for
      if (isPrime){
        primes.push(i);
        break;// out of while
      }//end if
      i++;
    }//end while
  }//end for
  return primes;
}//end calcPrimes

//adds strings of numbers (likely ones larger than 32-bit numbers)
function add(string1, string2) {
  var result = "";
  var temp = 0;
  //work from right to left...
  for(var i = a.length - 1; i > -1; i--){
    //add vertically, including carryover if needed
    var x = Number(a[i]) + Number(b[i]) + temp;
    temp = 0;
    //if no carryover...
    if(x < 10){
      //stick x on the far left of the result string
      result = x += result;
    }
    //if carryover...
    else{
      //convert to string
      x = String(x);
      //temporarily store carryover
      temp = Number(x[0]);
      //stick remainder on the far left of the result string
      result = x[1] += result;
    }
  }
  //if the last iteration of the loop left carryover, tack that on too
  if (temp > 0){
    result = temp + result;
  }
  return result;
}

//sorts array in-place by insertion sort
var insertionSort = function(array){
  for(var i = 1; i < array.length; i++){
    for(var n = 0; n < array.length; n++){
      if(array[i] > array[n]){
        continue;
      }
      else{
        var x = array.splice(i, 1)[0];
        array.splice(n, 0, x);
        break;
      }
    }
  }
};

//creates a new, sorted array by insertion sort, but uses binary search instead of linear
//significantly faster than standard insertion sort, still not as good as quick sort
var binaryInsertionSort = function(array){
  var sorted = [];
  sorted.push(array[0]);

  for (var i = 1; i < array.length; i++) {
    var index = -1;

    //the below was adapted from a snippet lifted from http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
    var minIndex = 0;
  	var maxIndex = sorted.length - 1;
  	var currentIndex = 0;
  	var currentElement = 0;


  	while (minIndex <= maxIndex) {
  	 currentIndex = (minIndex + maxIndex) / 2 | 0;
  		currentElement = sorted[currentIndex];

  		if (currentElement < array[i]) {
  			minIndex = currentIndex + 1;
  		}
  		else if (currentElement > array[i]) {
  			maxIndex = currentIndex - 1;
  		}
  		else {
  			index = currentIndex;
        break;
  		}
  	}

    if (index < 0) {
      index = Math.abs(~maxIndex);
    }

    sorted.splice(index, 0, array[i]);
  }

  return sorted;
};
