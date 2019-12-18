import React from 'react';
import './App.css';


let string = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'
let arr = string.split(' ');
arr = arr.map(substring => {
  return parseInt(substring);
});
let sorted = string.split(' ');
sorted = sorted.map(substring => {
  return parseInt(substring);
});
sorted = sorted.sort((a, b) => a - b);

class App extends React.Component {

  state = {
    linear: null,
    binary: null
  }

  handleLinear = (input) => {
    let output = false;
    let counter = 0;
    while (output === false && counter < arr.length) {
      if (arr[counter] === input) {
        output = counter + 1;
      }
      counter++;
    }

    this.setState({
      linear: output
    });
  }

  handleBinary = (input) => {
    let output = false;
    let counter = 1;

    function findBinary(findMe, arr, start = 0, end = arr.length - 1) {
      if (start > end) return false;
      let middleIndex = Math.floor((start + end) / 2);

      if (arr[middleIndex] === findMe) {
        return arr[middleIndex];
      }

      if (arr[middleIndex] > findMe) {
        counter++;
        return findBinary(findMe, arr, start, middleIndex - 1);
      }

      if (arr[middleIndex] < findMe) {
        counter++;
        return findBinary(findMe, arr, middleIndex + 1, end);
      }
    }
    

    if (findBinary(input, sorted) === false) {
      output = false;
    } else output = counter;

    this.setState({
      binary: output
    });
  }

  render() {

    let linearText = null;
    if (this.state.linear !== null) {
      linearText = this.state.linear === false ? 'Linear: Item was not found.' : `Linear: Item was found in ${this.state.linear} tries.`;
    }

    let binaryText = null;
    if (this.state.binary !== null) {
      binaryText = this.state.binary === false ? 'Binary: Item was not found.' : `Binary: Item was found in ${this.state.binary} tries.`;
    }

    return (
      <div className="App">
        <form id='linear' onSubmit={(event) => {
          event.preventDefault();
          let intvalue = parseInt(event.target.linear.value);
          this.handleLinear(intvalue);
        }}>
          <label htmlFor='linear'>Linear</label>
          <input type='number' name='linear' ></input>
          <button type='submit'>Submit</button>
        </form>

        <form id='binary' onSubmit={(event) => {
          event.preventDefault();
          let intvalue = parseInt(event.target.binary.value);
          this.handleBinary(intvalue);
        }}>
          <label htmlFor='binary'>Binary</label>
          <input type='number' name='binary'></input>
          <button type='submit'>Submit</button>
        </form>

        <div id='linear-results'>{linearText}</div>
        <div id='binary-results'>{binaryText}</div>
      </div>
    );
  }
}

export default App;


// 1. How many searches? 
  // 11, 5, 6, 8 (found)
  // 11, 15, 17 (not found)


// 3. Find a book
  //Assuming that the books are held in a sorted multi-level array
    //Each index in the main array would corrospond to a certain decimal.
    //Each subarray would be the books held within the decimal
  //We also have to assume that no author is provided since the problem doesn't say we are provided with one.

  //I would take the Dewey and impliment a binary search to find the correct decimal.
    //At that point we would have a subarray which is significantly smaller than the main-level array.
  //Since we are not provided an Author we have to scan every book in the subarray by title which would be using a linear search.
    //Since books are sorted by Decimal then Author's last name and we dont have the Author name we have to use this type of search from here on out.
    //This does not however change our time complexity. Since the subarrays are vastly smaller and do not scale according to n we have an overall time-complexity of O(log(n)) 

  //This could be made even better with a hash map by pointing us directly to the subarray we want, however would take up significantly more space. In this case the algorithm reduces even further to O(1). 
    //This approach is more similar to what we have in real life as there are designated parts of a building for each genre/subgenre/decimal of books


// 4. Searching in a BST
  // 1) 14 19 15 27 25 79 89 35
  // 2) 8 6 5 7 10 9 11

