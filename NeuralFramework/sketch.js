var programs = {
  NeuralClassifier: 1,
  XOR: 2,
  ColorPredictor: 3,
  FlappyBird: 4,
 
};

var program = 0;
var prog;

function setup() {
  
  createCanvas(400, 400);
  
  sel = createSelect();
  sel.position(0, 0);
  sel.option('-', 0);
  sel.option('NeuralClassifier', 1);
  sel.option('XOR', 2);
  sel.option('ColorPredictor', 3);
  sel.option('FlappyBird', 4);
  sel.changed(changeProgram);
  
  noLoop();
  
}

function draw() {
  switch (program) {
  case 0:
    background(255);
    break;      
  case 1:
    prog.drawNeuralClassifier();
    break;      
  case 2:
    prog.drawXOR();
    break;
  case 3:
    prog.drawColorPredictor();
    break;
  case 4:
    prog.drawFlappyBird();
    break;   
  }
}

function mousePressed() {
  switch (program) {
  case 0:
    break;
  case 1:
    prog.mousePressedNeuralClassifier();    
    break;    
  case 2:
    break;
  case 3:
    prog.mousePressedColorPredictor(); 
    break;
  case 4:
    prog.mousePressedFlappyBird();   
    break;  
  }
}

function changeProgram()
{
  program = int(sel.value());
  
  if (typeof prog != "undefined")
  {
    prog.destroy();
  }
  
  switch (program) { 
  case 0:
    break;    
  case 1:
    prog = new NeuralClassifier(600,600);
    prog.setupNeuralClassifier(); 
    break;
  case 2:
    prog = new XOR(400,400);  
    prog.setupXOR();
    break;
  case 3:
    prog = new ColorPredictor(600, 300)  
    prog.setupColorPredictor();
    break;  
  case 4:
    prog = new FlappyBird(600,400);  
    prog.setupFlappyBird();
    break;  
  } 
  
}
