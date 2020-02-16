class JPerceptron
{
  constructor(topology, learning_rate) {
    
    this.learning_rate = learning_rate;
    this.weights = [];
    this.bias = random(-1, 1);
    
    for (let i = 0; i < topology; i++)
    {
      this.weights[i] = random(-1, 1);
    }
    
  }

  train(inputs, target) 
  {
  
    let output = this.feedForward(inputs);
    let error = output - target;
    for (let i = 0; i < this.weights.length; i++) 
    {
      this.weights[i] -= this.learning_rate * error * inputs[i];
    }
    this.bias -= this.learning_rate * error;
  }

  feedForward(inputs) 
  {
    
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++)
    {
      sum += inputs[i] * this.weights[i];
    }
    sum += this.bias;
    
    return this.activate(sum);
  }

  activate(sum) 
  {
   return 1 / (1 + Math.exp(-sum)) 
  }


}