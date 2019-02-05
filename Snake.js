var s;
var c;
var scl = 20;
var food;
playfield = 400;

// p5js Setup function - required

function setup() {
 createCanvas(playfield, 400);
 background(0);
 s = new Snake(0,0);
 c = new Snake(scl*10,scl*10);
 frameRate (15);
 pickLocation();
}



function draw() {
 background(0);
 if (s.eat(food)) {
   pickLocation();
 }
 s.death();
 s.update();
 s.show();
 if (c.eat(food)) {
   pickLocation();
 }
 c.death();
 c.update();
 c.show();

 fill (255,0,100);
 rect(food.x,food.y, scl, scl);
}


function pickLocation() {
 var cols = floor(playfield/scl);
 var rows = floor(playfield/scl);
 food = createVector(floor(random(cols)), floor(random(rows)));
 food.mult(scl);


 for (var i = 0; i < s.tail.length; i++) {
   var pos = s.tail[i];
   var d = dist(food.x, food.y, pos.x, pos.y);
   if (d < 1) {
     pickLocation();
   }
 }
}

function keyPressed() {
 if (keyCode === UP_ARROW){
     s.dir(0, -1);
       c.dir(0, -1);
 }else if (keyCode === DOWN_ARROW) {
     s.dir(0, 1);
     c.dir(0, 1);
 }else if (keyCode === RIGHT_ARROW) {
     s.dir(1, 0);
     c.dir(1, 0);
 }else if (keyCode === LEFT_ARROW) {
     s.dir(-1, 0);
       c.dir(-1, 0);
 }
}


function Snake(x,y) {
 this.x =x;
 this.y =y;
 this.xspeed = 1;
 this.yspeed = 0;
 this.total = 0;
 this.tail = [];

 this.dir = function(x,y) {
   this.xspeed = x;
   this.yspeed = y;
 }

 this.eat = function(pos) {
   var d = dist(this.x, this.y, pos.x, pos.y);
   if (d < 1) {
     this.total++;
     return true;
   } else {
     return false;
   }
 }

 this.death = function() {
   for (var i = 0; i < this.tail.length; i++) {
     var pos = this.tail[i];
     var d = dist(this.x, this.y, pos.x, pos.y);
     if (d < 1) {
       this.total = 0;
       this.tail = [];
     }
   }
 }

 this.update = function(){
   if (this.total === this.tail.length) {
     for (var i = 0; i < this.tail.length-1; i++) {
       this.tail[i] = this.tail[i+1];
   }

   }
   this.tail[this.total-1] = createVector(this.x, this.y);

   this.x = this.x + this.xspeed*scl;
   this.y = this.y + this.yspeed*scl;

   if(this.x<0){
       this.x=width;
   }
   if(this.x>width){
       this.x=0;
   }
   if(this.y<0){
       this.y=height;
   }
   if(this.y>height){
       this.y=0;
   }


 }
 this.show = function(){
   for (var i = 0; i < this.tail.length; i++) {
         fill(0,map(i,0,this.tail.length,127,255),0);
       rect(this.tail[i].x, this.tail[i].y, scl, scl);
   }
        fill(0,255,0);
   rect(this.x, this.y, scl, scl);
 }
}