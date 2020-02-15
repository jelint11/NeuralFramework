class JGeneticAlgoritm
{
  
  constructor(populationsize)
  {
    this.probtable = []; // for roullete
  }
  
  createNewGeneration(objects,selection,crossover,elitism,population)
  {
    //precompute 
    let newgeneration = [];
    let index;
    let child;
    
    objects.sort((a, b) => b.fitness - a.fitness); //sort by fitness
    if (selection === 'roullete')
    {
      this.computeProbTable(objects) 
    }
    
    //elitism
    for (var i = 0; i < elitism; i++)
    {
      newgeneration.push(objects[i].createChild()); 
    }
    
    //main cycle
    while (newgeneration.length < population)
    {
      if (crossover === 'none') //select parents and crossover
      {
        index = this.selectParentIndex(objects,selection);
        child = objects[index].createChild(); //create child
        child.mutateSelf(); //mutate self
        newgeneration.push(child);
      }
    }
    
    return newgeneration;
    
  }
  
  computeProbTable(objects)
  {
    //https://en.wikipedia.org/wiki/Fitness_proportionate_selection
    this.probtable = [];
    let totalfitness = 0;
    
    for (var i = 0; i < objects.length; i++)
    {
      totalfitness += objects[i].fitness;
    }
    
    this.probtable[0] = objects[0].fitness / totalfitness;
    for (i = 1; i < objects.length - 1; i++)
    {
      this.probtable[i] = this.probtable[i - 1] + (objects[i].fitness / totalfitness);
    }
    this.probtable[objects.length - 1] = 1;
    
  }
  
  selectParentIndex(objects,selection)
  {
    if (selection === 'roullete')
    {
      let rnd = uniformRandom(0,1);
      return this.probtable.findIndex(((value) => value >= rnd));
    }
    
  }
}