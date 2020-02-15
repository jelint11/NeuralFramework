//reinforsment learning
class FlappyBird
{  

  constructor(AWidth,AHeight)
  {
    
    this.width = AWidth;
    this.height = AHeight;
    this.POPULATION = 500;
    this.birds = [];
    this.deadbirds = [];
    this.gates = [];
    this.geneticalgoritm = new JGeneticAlgoritm(); 
    this.pc = 0;
    this.slider = createSlider(1,100, 1); 
    this.highscore = 0;
    this.generation = 0; 
    
    for (var i = 0; i < this.POPULATION; i++)
    {
      this.birds[i] = new Bird();
    }
  }
  
  destroy()
  {
    this.slider.remove();
  }

  setupFlappyBird()
  {
    resizeCanvas(this.width,this.height);
    loop();
  }


  processTick()
  {
    this.pc++;

    textSize(16);
    text('score:  ' + this.pc, this.width - 130, 20);
    text('highscore: ' + this.highscore, this.width - 130, 40);
    text('generation: ' + this.generation, this.width - 130, 60);
    text('alive:  ' + this.birds.length, this.width - 130, 80);

    //gate creation
    if (this.pc % 160 == 1)
    {
      this.gates.push(new Gate());
    }

    //update gates
    for (let gate of this.gates)
    {
      gate.updateSelf();
    }

    //remove gate which is out of screen
    if (!this.gates[0].isVisible())
    {
      this.gates.splice(0,1); 
    }


    let closestgate = this.closestGate();
    //update birds 
    for (var i = this.birds.length - 1; i >= 0; i--)
    {
      this.birds[i].think(closestgate);
      this.birds[i].updateSelf();
      //detect collisions
      if (!this.birds[i].isVisible() || this.birds[i].isCollision(closestgate))
      {
        this.deadbirds.push(this.birds.splice(i, 1)[0]); 
      }
    }

    //create new generation
    if (this.birds.length == 0)
    {
      this.generation++;
      this.highscore = Math.max(this.pc,this.highscore);
      this.gates = [];
      this.pc = 0;
      this.birds = this.geneticalgoritm.createNewGeneration(this.deadbirds, 'roullete','none',5,this.POPULATION/2);
      for (i = 0; i < this.POPULATION/2 ;i++) //halfpopulation evolved, half recreated
      {
        this.birds.push(new Bird());
      }
      this.deadbirds = [];
    }

  }

  drawFlappyBird()
  {
    background(0);

    for (var i = 0; i < this.slider.value();i++)
    {
      this.processTick();
    }  

    for (let gate of this.gates)
    {
      gate.showSelf();
    }
    for (let bird of this.birds)
    {
      bird.showSelf();
    }

  }

  //return closest gate to the bird
  closestGate()
  {
    for (let gate of this.gates)
    {
      if (gate.x + gate.width > this.birds[0].x - this.birds[0].diameter) 
      {
        return gate;    
      }
    }
  }

  mousePressedFlappyBird()
  {
   // bird.flyUp();
  }


}