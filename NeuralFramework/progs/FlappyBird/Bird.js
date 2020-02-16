class Bird 
{

  constructor()
  {
    //bird position
    this.x = 40;
    this.y = height/2;
    this.diameter = 10;
    
    //bird fyzics
    this.gravity = 0.9;
    this.velocity = 0;
    this.wingPower = 5;
    
    //neural network
    this.brain = new JNeuralNetwork([5,5,2], 0.1);
    this.fitness = 0; 
  }
 
  
  showSelf()
  {
    strokeWeight(1)
    stroke(255);
    fill(255,100);
    ellipse(this.x,this.y,this.diameter*2,this.diameter*2);
  }
  
  updateSelf()
  {
    
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    this.fitness++;
    
  }

  flyUp()
  {
    this.velocity = this.velocity - this.wingPower ;
    
  }
  
  think(gate)
  {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = this.velocity / 20;
    inputs[2] = gate.top / height;
    inputs[3] = gate.bottom / height;
    inputs[4] = gate.x / width;
    
    let outputs = this.brain.feedForward(inputs);
    if (outputs[0] > outputs[1])
    {
      this.flyUp();
    }
    
  }  
    
  isVisible()
  {
   if (this.y - this.diameter > 0 && this.y + this.diameter < height)
   {
     return true;    
   }
   return false;
    
  }
  
  isCollision(gate)
  {
   if (this.x + this.diameter > gate.x && this.x - this.diameter < gate.x + gate.width)
   {
     if(this.y - this.diameter < gate.top || this.y + this.diameter > height - gate.bottom)
     {
       return true;
     }
   }
   return false;
  
  }
  
  createChild()
  {
    let child = new Bird();
    child.brain = JNeuralNetwork.copy(this.brain);
    return child;
  }
  
  mutateSelf()
  {
    for(let weightmatrix of this.brain.weights)  
    {
      weightmatrix.apply(plus,[uniformRandom(-0.1, 0.1)]);
    }
    
    for(let biasmatrix of this.brain.biases)  
    {
      biasmatrix.apply(plus,[uniformRandom(-0.1, 0.1)]);
    }
  }
  
  
  
  
}