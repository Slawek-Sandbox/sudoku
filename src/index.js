module.exports = function solveSudoku(matrix) {
/*--------------------------------------------------------
  This function solves sudoku using backtracking algorithm
---------------------------------------------------------*/
  const zeros = matrix.map((rowArr,r) => rowArr.map((v,c) => ({ //Object with '0' value objects, e.g. {value : 4, rowNo: 0, colNo: 2}
      value : v,
      rowNo : r,
      colNo : c
  }))).reduce((a,v) => a.concat(v),[]).filter(obj => obj.value === 0); //Make array flat and filter objects with value '0'
  if(zeros.length > 0){ //If some cell are empty
      
      let i = 0; //Index
      while(true){
        if(matrix[zeros[i].rowNo][zeros[i].colNo] < matrix.length){ //If cell value is < sudoku size (e.g. 9)
            matrix[zeros[i].rowNo][zeros[i].colNo]++; //Increment cell value
            if(checkSudoku(matrix, zeros[i].rowNo, zeros[i].colNo)){ //Sudoku values are OK
                if(i < zeros.length - 1){
                    i++;                    
                }
                else if(i === zeros.length - 1){
                    solved = true;
                    break;
                }
            }
        }
        else if(i > 0){ //Backtrack if possible
          matrix[zeros[i].rowNo][zeros[i].colNo] = 0;
          i--;
        }          
        else
          throw "It is not possible to solve this sudoku";
      }
  }
  return matrix;
}

function checkFlatArray(arr){
/*--------------------------------------------------------
  This function retruns 'true' when there are no duplicates
  in the array and 'false' otherwise. Only non '0' elements
  are checked.
---------------------------------------------------------*/
  //Sum of the array not equal to sum of unique values in the array
  if(arr.reduce((a,v) => a+v) !== [...new Set(arr)].reduce((a,v) => a + v))
      return false;
  return true;
}

function checkSudoku(matrix, rowNo, colNo){
/*--------------------------------------------------------
  This functions returns 'true' when sudoku is valid for
  the given row number, column number and a corresponding
  square.
---------------------------------------------------------*/
  //Check row
  if(!checkFlatArray(matrix[rowNo]))
      return false;
  //Check column
  if(!checkFlatArray(matrix.map(v => v[colNo])))
      return false;
  //Check square
  const sizeSqrt = Math.sqrt(matrix.length); //Size of a sqare to check, e.g. for sudoku size 9 is 3
  const squareRow = Math.floor(rowNo / sizeSqrt) * sizeSqrt; //Row number for square uppper left corner
  const squareCol = Math.floor(colNo / sizeSqrt) * sizeSqrt; //Column number for square uppper left corner
  const square = [...new Array(sizeSqrt)].map((v,i) => matrix[squareRow + i].slice(squareCol, squareCol + sizeSqrt)).reduce((a,v) => a.concat(v),[]);    
  if(!checkFlatArray(square))
      return false;
  return true;
}