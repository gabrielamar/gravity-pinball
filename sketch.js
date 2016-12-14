// Gabriela Martín Torres

// Gravity_Pinball

var w;
var planets=[];

//number of planets
var n = 6;

function setup() {
  createCanvas(840, 560);



// Make a Walker object
  w = new Walker();

  for(i=0;i<n;i++){
 //   var planets=[];
    var planet = createVector(width/(n/2+1)+i*width/(n/2+1),height/4);
    planets[2*i]=planet;
    planet = createVector(width/(n/2+1)+i*width/(n/2+1),3*height/4);
    planets[2*i+1]=planet;
    
  }



}



function draw() {
  background(0);
    for(i=0;i<n;i++){
    ellipse(planets[i].x,planets[i].y,80,80);
  }
  
// The exit door 
rect(width-15,height/3,15,height/3);

// Update and display the object
  w.update();
  w.display();
  w.edges();

}



function Walker() {

// Start Walker at a random location
 this.pos = createVector(random(0, 540), random(0, 260));
  
   
// Start Walker with 0 velocity and acceleration
  this.vel = createVector(-10, 0);
  this.acc = createVector(0, 0);


  this.update = function() {


  // Position of the planets
  
for (i=0;i<n;i++){
     var d1 = p5.Vector.dist(planets[i], this.pos);

    if (d1<40){
      var acc1 = p5.Vector.sub(planets[i], this.pos).mult(-0.5);
    }
    else{
    var acc1 = p5.Vector.sub(planets[i], this.pos).setMag(0.02);
    }
    this.acc.add(acc1)
}
  
  
   
// Acceleration on Walker due to each planet


// Physics engine algorithm
    this.vel.add(this.acc);
    this.vel.limit(30);
    this.pos.add(this.vel);
    this.acc.mult(0);

//Spring given by the player
if(mouseIsPressed){this.acc.add(-30,10)}
  }


  this.display = function() {
// Watch the object doesn't reach the exit door
if ((this.pos.x < width-30)||(this.pos.y<height/3)||(this.pos.y>2*height/3)){
   ellipse(this.pos.x, this.pos.y,30,30);
}
else{ if(mouseIsPressed){this.acc.add(-50,0)} else{noLoop()}}
 
    
// Stars in the sky  
      fill('white');
      tint(255,30);    
      ellipse(random(0,840), random(0,560) , 3, 3);
  }

//Bounce against the canvas borders  
    this.edges = function() {
    if (this.pos.y > height-10) {
      this.vel.y *= -1;
      this.pos.y = height-10;
    }
    
        if (this.pos.y <10) {
      this.vel.y *= -1;
      this.pos.y = 10;
    }

    if (this.pos.x > width-10) {
      this.vel.x *= -1;
      this.pos.x = width-10;
    }
        if (this.pos.x < 10) {
      this.vel.x *= -1;
      this.pos.x = 10;
    }
  }
  
}
