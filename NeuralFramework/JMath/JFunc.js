function plus(cell,params)
{
  return cell + params[0];
}

function minus(cell,params)
{
  return cell - params[0];
}

function multiply(cell,params)
{
  return cell * params[0];
}

function divide(cell,params)
{
  return cell / params[0];
}

function zeroIt(cell,params)
{
  return 0;
}

function randomizeUniform(cell,params)
{
  return uniformRandom(params[0], params[1]) 
}

function randomizeNormal(cell,params)
{
  return normalRandom(params[0], params[1]) 
}


function sigmoid(cell,params)
{
  return 1 / (1 + Math.exp(-cell)); 
}

function dsigmoid(cell,params)
{
  return cell * (1 - cell); 
}
