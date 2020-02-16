class JMatrix 
{

  constructor(rows, cols) 
  {
    this.cols = cols;
    this.rows = rows;
    this.matrix = [];
    
    for (var i = 0; i < this.rows;i++)
    {
      this.matrix[i] = []; 
      for (var j = 0; j < this.cols;j++)
      {
        this.matrix[i][j] = 0; 
      }
    }
  }
  
  printSelf()
  {
    console.table(this.matrix);
  }
  
  
  //apply function to every element, return new matrix
  static apply(matrix,fn,params)
  {
    let result = new JMatrix(matrix.rows,matrix.cols);
    for (var i = 0; i < matrix.rows;i++)
    {
      for (var j = 0; j < matrix.cols;j++)
      {
        result.matrix[i][j] = fn(matrix.matrix[i][j],params); 
      }
    }
    return result;
  }  
    
  //apply function to every element inplace
  apply(fn, params)
  {
    for (var i = 0; i < this.rows;i++)
    {
      for (var j = 0; j < this.cols;j++)
      {
        this.matrix[i][j] = fn(this.matrix[i][j],params); 
      }
    }   
  }  
  
  addMatrix(matrix)
  {
    if ((this.cols != matrix.cols) || (this.rows != matrix.rows)) 
    { 
      console.log('Number of columns or rows doesnt match2.')
      return undefined;
    }
    
    for (var i = 0; i < matrix.rows;i++)
    {
      for (var j = 0; j < matrix.cols;j++)
      {
        this.matrix[i][j] += matrix.matrix[i][j];
      }
    }
  } 
  
  subMatrix(matrix)
  {
    if ((this.cols != matrix.cols) || (this.rows != matrix.rows)) 
    { 
      console.log('Number of columns or rows doesnt match2.')
      return undefined;
    }
    
    for (var i = 0; i < matrix.rows;i++)
    {
      for (var j = 0; j < matrix.cols;j++)
      {
        this.matrix[i][j] -= matrix.matrix[i][j];
      }
    }
  } 
  
  
  static addMatrixes(matrix1,matrix2)
  {
    if ((matrix1.cols != matrix2.cols) || (matrix1.rows != matrix2.rows)) 
    { 
      console.log('Number of columns or rows doesnt match.')
      return undefined;
    }
    
    let result = new JMatrix(matrix1.rows,matrix1.cols);
    for (var i = 0; i < matrix1.rows;i++)
    {
      for (var j = 0; j < matrix1.cols;j++)
      {
        result.matrix[i][j] = matrix1.matrix[i][j] + matrix2.matrix[i][j];
      }
    }
    return result;
  } 
  
  static substractMatrixes(matrix1,matrix2)
  {
    if ((matrix1.cols != matrix2.cols) || (matrix1.rows != matrix2.rows)) 
    { 
      console.log('Number of columns or rows doesnt match.')
      return undefined;
    }
    
    let result = new JMatrix(matrix1.rows,matrix1.cols);
    for (var i = 0; i < matrix1.rows;i++)
    {
      for (var j = 0; j < matrix1.cols;j++)
      {
        result.matrix[i][j] = matrix1.matrix[i][j] - matrix2.matrix[i][j];
      }
    }
    return result;
  }
  
  
  
  multiplyMatrixesScalar(matrix)
  {
    if ((matrix.cols != this.cols) || (matrix.rows != this.rows)) 
    { 
      console.log('Number of columns or rows doesnt match.')
      return undefined;
    }
    
    for (var i = 0; i < matrix.rows;i++)
    {
      for (var j = 0; j < matrix.cols;j++)
      {
        this.matrix[i][j] *= matrix.matrix[i][j];
      }
    }
  }
  
  static multiplyMatrixesScalar(matrix1,matrix2)
  {
    if ((matrix1.cols != matrix2.cols) || (matrix1.rows != matrix2.rows)) 
    { 
      console.log('Number of columns or rows doesnt match.')
      return undefined;
    }
    
    let result = new JMatrix(matrix1.rows,matrix1.cols);
    for (var i = 0; i < matrix1.rows;i++)
    {
      for (var j = 0; j < matrix1.cols;j++)
      {
        result.matrix[i][j] = matrix1.matrix[i][j] * matrix2.matrix[i][j];
      }
    }
    return result;
  }
  
  static multiplyMatrixes(matrix1,matrix2)
  { 
    if (matrix1.cols != matrix2.rows) 
    { 
      console.log('Wrong matrix dimension.')
      return undefined;
    }
    
    let result = new JMatrix(matrix1.rows,matrix2.cols);
    let sum = 0;
    for (var i = 0; i < matrix1.rows;i++)
    {
      for (var j = 0; j < matrix2.cols;j++)
      {
        sum = 0; 
        for (var k = 0; k < matrix1.cols;k++)
        { 
          sum += matrix1.matrix[i][k] * matrix2.matrix[k][j];
        }
        result.matrix[i][j] = sum;
      }
    }
    return result;
  }
  
  static transpose(matrix)
  {
    let result = new JMatrix(matrix.cols,matrix.rows);
    for (var i = 0; i < matrix.cols;i++)
    {
      for (var j = 0; j < matrix.rows;j++)
      {
        result.matrix[i][j] = matrix.matrix[j][i];
      }
    }
    return result;
  }
  
  //transpose and normalize by row
  
  static transposeAndNormalize(matrix)
  {
    let result = new JMatrix(matrix.cols,matrix.rows);
    let sum = 0;
    for (var i = 0; i < matrix.rows;i++)
    {
      sum = 0;
      for (var j = 0; j < matrix.cols;j++)
      {
        sum += matrix.matrix[i][j];
      }
      for (var j = 0; j < matrix.cols;j++)
      {
        result.matrix[j][i] = matrix.matrix[i][j] / sum;
      }
    }
    return result;
  }
  
  
  static arrayToMatrix(arr)
  {   
    let result = new JMatrix(arr.length,1);
    for (var i = 0; i < arr.length; i++)
    { 
      result.matrix[i][0] = arr[i];
    }
    return result;
  }  
  
  static matrixToArray(matrix)
  {
    let result = [];
    for (var i = 0; i < matrix.rows; i++)
    { 
      result.push(matrix.matrix[i][0]);
    }
    return result;
  }  
  
  static copy(matrix)
  {
    let result = new JMatrix(matrix.rows, matrix.cols);
    result.addMatrix(matrix);
    return result;
  }
  
  
}