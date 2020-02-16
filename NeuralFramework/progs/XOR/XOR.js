let training_data = [
  {
    inputs: [1,0],
    targets: [1] 
  },
  {
    inputs: [0,1],
    targets: [1] 
  },
  {
    inputs: [0,0],
    targets: [0] 
  },
  {
    inputs: [1,1],
    targets: [0] 
  }
];

class XOR 
{
  constructor(AWidth,AHeight) 
  {
    this.width = AWidth;
    this.height = AHeight; 
    this.xor_iteration = 0; 
    this.nn = new JNeuralNetwork([2,4,1], 0.1);
  }

  destroy()
  {
    
  }
  
  setupXOR()
  {
    createCanvas(this.width, this.height);
    loop();
  }  

  drawXOR()
  {
    background(0);
    let data;
    for (let i = 0; i<1000;i++)
    {
      data = random(training_data);
      this.nn.train(data.inputs,data.targets);
    }

    let resolution = 10;
    let cols = this.width / resolution;
    let rows = this.height / resolution;
    for (var i = 0; i < cols;i++)
    {
      for (var j = 0; j < rows;j++)
      {
        let x1 = i/cols;
        let x2 = j/rows;
        let y = this.nn.feedForward([x1,x2]);
        noStroke();
        fill(y*255);
        rect(i*resolution,j*resolution,resolution,resolution);
      }
    }  
    textSize(24);
    fill(0);
    text('iter:' + this.xor_iteration++,this.width -130 ,20); 
  }

}
