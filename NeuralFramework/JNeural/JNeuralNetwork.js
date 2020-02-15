class JNeuralNetwork 
{
  constructor(topology, learning_rate, init_method) 
  {
    
    this.topology = topology;
    this.learning_rate = learning_rate;
    this.init_method = init_method
    this.weights = [];
    this.layers = []; 
    this.biases = [];          
    
    for (var i = 0; i < this.topology.length - 1;i++)
    {
      this.weights.push(new JMatrix(this.topology[i+1], this.topology[i])); 
      this.biases.push(new JMatrix(this.topology[i+1], 1));
      if (this.init_method === 'Xavier')
      {
        this.weights[i].apply(randomizeNormal, [0, 2/(this.topology[i] + this.topology[i+1])]);
        this.biases[i].apply(randomizeNormal, [0, 2/(this.topology[i] + this.topology[i+1])]);
      }
      else
      {
        this.weights[i].apply(randomizeUniform, [-1, 1]);
        this.biases[i].apply(randomizeUniform, [-1, 1]);
      }
    }  
    
  }
  
  feedForward(input_array)
  {
    this.layers = [];
    this.layers.push(JMatrix.arrayToMatrix(input_array));
    
    for (var i = 0; i < this.topology.length - 1; i++)
    {
      this.layers.push(JMatrix.multiplyMatrixes(this.weights[i],this.layers[i]));
      this.layers[i+1].addMatrix(this.biases[i]);
      this.layers[i+1].apply(sigmoid,[]);
    }  
    
    return JMatrix.matrixToArray(this.layers[this.layers.length - 1]);
  }  
  
  train (input_array, target_array)
  {
    //feed forward 
    this.feedForward(input_array);
    
    //matice ocekavanych vystupu
    let targets = JMatrix.arrayToMatrix(target_array);
    let gradients;
    let deltas;
    
    for (var i = this.weights.length - 1; i >= 0; i--)
    {
      if (i == this.weights.length - 1) //vypocet delty v l-te vrstve
      {
        let errors = JMatrix.substractMatrixes(this.layers[i + 1],targets);
        deltas = JMatrix.multiplyMatrixesScalar(JMatrix.apply(this.layers[i+1],dsigmoid,[]),errors);  
      }  
      else
      {
        deltas = JMatrix.multiplyMatrixes(JMatrix.transpose(this.weights[i+1]),deltas); 
        deltas.multiplyMatrixesScalar(JMatrix.apply(this.layers[i+1],dsigmoid,[]));
      }  
      gradients = JMatrix.multiplyMatrixes(deltas,JMatrix.transpose(this.layers[i]));
      gradients.apply(multiply,[this.learning_rate]);
      this.weights[i].subMatrix(gradients);
      this.biases[i].subMatrix(JMatrix.apply(deltas,multiply,[this.learning_rate]));
    } 
  }  
  
  
  static copy(neuralnetwork)
  {
    let result = new JNeuralNetwork(neuralnetwork.topology, neuralnetwork.thislearning_rate, neuralnetwork.init_method);
    for (var i = 0; i < neuralnetwork.weights.length;i++)
    {
      result.weights[i] = JMatrix.copy(neuralnetwork.weights[i]);
    }
    
    for (i = 0; i < neuralnetwork.biases.length;i++)
    {
      result.biases[i] = JMatrix.copy(neuralnetwork.biases[i]);
    }
    
    return result;
  }
    
}