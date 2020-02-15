class cPoint {

  constructor(AWidth,AHeight) {
    this.x = random(0, AWidth);
    this.y = random(0, AHeight);

    if (lineDefinition(this.x) > this.y) {
      this.label = 1;
    } else {
      this.label = 0;
    }
  }

  showSelf() {
    strokeWeight(1)
    stroke(0);
    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, 16, 16);
  }

}

function lineDefinition(x) 
{
  //y = ax + b 
  //return 1/2*x + 230
  return 3 * x - 450;
}


class NeuralClassifier 
{

  constructor(AWidth,AHeight) 
  {
    this.width = AWidth;
    this.height = AHeight;
    this.points = [];
    this.neuron = new JPerceptron(2, 0.01);
    this.pointCount = 100;
    this.slider = createSlider(1, 1000, 1);
    
    for (var i = 0; i < this.pointCount; i++)
    {
      this.points[i] = new cPoint(this.width,this.height);
    }
  }

  destroy()
  {
    this.slider.remove();
  }
  
  setupNeuralClassifier()
  {
    resizeCanvas(this.width,this.height); 
    noLoop() 
  }
  
  drawNeuralClassifier() 
  {
    background(255);

    line(0, lineDefinition(0), this.width, lineDefinition(this.width));

    //w0x + w1y + wb = 0

    line(0, -this.width * this.neuron.bias / this.neuron.weights[1],
      this.width, (-this.width * this.neuron.weights[0] - this.width * this.neuron.bias) / this.neuron.weights[1]);

    let output;
    let input;
    for (var i = 0; i < this.pointCount; i++) {
      this.points[i].showSelf();
      input = [this.points[i].x / this.width, this.points[i].y / this.height];
      output = this.neuron.feedForward(input);
      if (Math.round(output) == this.points[i].label) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
      ellipse(this.points[i].x, this.points[i].y, 8, 8);
    }

  }

  mousePressedNeuralClassifier() {
    let input;
    for (var j = 0; j < this.slider.value(); j++) {
      for (var i = 0; i < this.pointCount; i++) {
        input = [this.points[i].x / this.width, this.points[i].y / this.height];
        this.neuron.train(input, [this.points[i].label]);
      }
    }
    this.drawNeuralClassifier()
  }
  
}