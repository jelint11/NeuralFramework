
class ColorPredictor
{  

  constructor(AWidth,AHeight)
  {
    this.width = AWidth;
    this.height = AHeight;
    this.whitch = 'black';
    this.nn = new JNeuralNetwork([3,3,2], 0.1);
    this.trainColors(10000);
    this.pickColor();
  }
  
  pickColor()
  {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  destroy()
  {
    
  }
  
  setupColorPredictor()
  {
    resizeCanvas(this.width, this.height);
    noLoop();
  }  

  drawColorPredictor()
  {
    background(this.r,this.g,this.b);
    strokeWeight(4)
    stroke(0);
    line(this.width / 2, 0, this.width / 2, this.height);

    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER,CENTER);
    text('black',150,100);
    fill(255);
    text('white',450,100);

    let outputs = this.predictColor();
    if (outputs[0] > outputs[1])
    {
      fill(0);
      ellipse(150,200,60)
    }
    else
    {
      fill(255);
      ellipse(450,200,60)
    }

    textSize(24);
    fill(0);
    text(Math.round(outputs[0] * 1000) / 1000,40,280)
    fill(255);
    text(Math.round(outputs[1] * 1000) / 1000,350,280)
  }

  mousePressedColorPredictor()
  {
    let targets;
    let inputs = [this.r / 255, this.g / 255, this.b / 255];
    if (mouseX > this.width / 2)
    {
      targets = [0,1];
    }
    else
    {
      targets = [1,0];
    }
    this.nn.train(inputs,targets);
    this.pickColor();
    redraw();
  }

  predictColor()
  {
    let inputs = [this.r / 255, this.g / 255, this.b / 255];
    let outputs = this.nn.feedForward(inputs);

    return outputs;
  } 

  trainColors(iterations)
  {
    for (var i = 0; i < iterations;i++)
    {
      this.pickColor();

      let inputs = [this.r / 255, this.g / 255, this.b / 255];
      let targets;
      if (this.r + this.g + this.b  > 255 * 3 / 2 )
      {
        targets = [1,0];
      }
      else 
      {
        targets = [0,1]; 
      }
      this.nn.train(inputs,targets);
    }
  }

}
