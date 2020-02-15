class Gate
{

  constructor()
  {
    this.top = random(height - 50)
    this.bottom = random(height - this.top - 50)
    this.x = width;
    this.width = 40;
    this.speed = 2;
  }

  showSelf()
  {
    fill(255);
    rect(this.x,0,this.width,this.top);
    rect(this.x,height-this.bottom,this.width,this.bottom);
  }
  
  updateSelf()
  {
    this.x -= this.speed;
  }
  
  isVisible()
  {
    return this.x >= 0; 
  }
}