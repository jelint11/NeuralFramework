function uniformRandom(min,max) 
{
   var r = Math.random();
   return min + r * (max - min)
}

function exponentialRandom(mean) 
{
   var r = Math.random();
   return - mean * Math.log(r);
}

function normalRandom(mean, std) 
{
    var x = 0;
    for (var i = 0; i < 12; i++)
    {
       x += Math.random();
    }
    return (x - 6)*std + mean;
}