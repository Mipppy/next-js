//This is pretty self explainatory
//It uses the Vertex()function found in script.js  and then draw.js draws the models.

class Cube {
  constructor(x,y,z,oneSide) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.visible = true;
    this.oneSide = oneSide;
    
    this.vertexes = [];
    this.vertexes.push(new Vertex(this.x+this.oneSide/2, this.y+this.oneSide/2, this.z+this.oneSide/2));
    this.vertexes.push(new Vertex(this.x-this.oneSide/2, this.y+this.oneSide/2, this.z+this.oneSide/2));
    this.vertexes.push(new Vertex(this.x-this.oneSide/2, this.y-this.oneSide/2, this.z+this.oneSide/2));
    this.vertexes.push(new Vertex(this.x+this.oneSide/2, this.y-this.oneSide/2, this.z+this.oneSide/2));
    this.vertexes.push(new Vertex(this.x+this.oneSide/2, this.y+this.oneSide/2, this.z-this.oneSide/2));
    this.vertexes.push(new Vertex(this.x-this.oneSide/2, this.y+this.oneSide/2, this.z-this.oneSide/2));
    this.vertexes.push(new Vertex(this.x-this.oneSide/2, this.y-this.oneSide/2, this.z-this.oneSide/2));
    this.vertexes.push(new Vertex(this.x+this.oneSide/2, this.y-this.oneSide/2, this.z-this.oneSide/2));
    
    this.edges = [];

    this.faces = [];
    this.faces.push([0,1,2,"#FFFFFF"]);
    this.faces.push([2,3,0,"#FFFFFF"]);
    this.faces.push([5,4,7,"#FFFFFF"]);
    this.faces.push([7,6,5,"#000000"]);
    this.faces.push([1,0,4,"#000000"]);
    this.faces.push([4,5,1,"#000000"]);
    this.faces.push([1,5,6,"#000000"]);
    this.faces.push([6,2,1,"#000000"]);
    this.faces.push([6,7,3,"#000000"]);
    this.faces.push([3,2,6,"#000000"]);
    this.faces.push([4,0,3,"#000000"]);
    this.faces.push([3,7,4,"#000000"]);
  }
}

class Bullet {
  constructor(x,y,z,vec) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.visible = true;
    this.vec = vec;
    this.alive = true;
    this.vertexes = [];
    this.vertexes.push(new Vertex(this.x,this.y,this.z));
    
    this.edges = [];

    this.faces = [];
    this.faces.push([0,10,"#000000"]);
  }
}

class Blast {
  constructor(x,y,z,r,size) {
    this.center = {
      "x":x,
      "y":y,
      "z":z
    }
    this.x = this.center.x;
    this.y = this.center.y;
    this.z = this.center.z;
    this.size = size;
    this.visible = true;
    this.vec = {"x":0,"y":0,"z":1};
    this.vec = rotate({"x":1,"y":0,"z":0},this.vec,Math.random()*Math.PI*2);
    this.vec = rotate({"x":0,"y":1,"z":0},this.vec,Math.random()*Math.PI*2);
    this.vec = rotate({"x":0,"y":0,"z":1},this.vec,Math.random()*Math.PI*2);
    this.vec.x *= r;
    this.vec.y *= r;
    this.vec.z *= r;
    this.prog = 0;
    this.alive = true;
    this.vertexes = [];
    this.vertexes.push(new Vertex(this.x,this.y,this.z));
    
    this.edges = [];

    this.faces = [];
    this.faces.push([0,this.size,"#FF0000"]);
    
  }
}

class Target {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.visible = true;

    this.vertexes = [];
    this.vertexes.push(new Vertex(0,282,0));
    this.vertexes.push(new Vertex(-200,0,200));
    this.vertexes.push(new Vertex(200,0,200));
    this.vertexes.push(new Vertex(200,0,-200));
    this.vertexes.push(new Vertex(-200,0,-200));
    this.vertexes.push(new Vertex(0,-282,0));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    this.faces.push([0,1,2,"#FF0000"]);
    this.faces.push([0,2,3,"#FF0000"]);
    this.faces.push([0,3,4,"#FF0000"]);
    this.faces.push([0,4,1,"#FF0000"]);
    this.faces.push([5,2,1,"#FF0000"]);
    this.faces.push([5,3,2,"#FF0000"]);
    this.faces.push([5,4,3,"#FF0000"]);
    this.faces.push([5,1,4,"#FF0000"]);
  }
}

class Cloud {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.vertexes = [];
    this.vertexes.push(new Vertex(0,282,0));
    this.vertexes.push(new Vertex(-1000,0,1000));
    this.vertexes.push(new Vertex(1000,0,1000));
    this.vertexes.push(new Vertex(1000,0,-1000));
    this.vertexes.push(new Vertex(-1000,0,-1000));
    this.vertexes.push(new Vertex(0,-282,0));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    this.faces.push([0,1,2,"#FFFFFF"]);
    this.faces.push([0,2,3,"#FFFFFF"]);
    this.faces.push([0,3,4,"#FFFFFF"]);
    this.faces.push([0,4,1,"#FFFFFF"]);
    this.faces.push([5,2,1,"#FFFFFF"]);
    this.faces.push([5,3,2,"#FFFFFF"]);
    this.faces.push([5,4,3,"#FFFFFF"]);
    this.faces.push([5,1,4,"#FFFFFF"]);
  }
}

class Aircraft {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.boosting = false;
    this.boost_cool = 60;
    this.visible = true;
    this.axis = {"x":0,"y":1,"z":0};
    this.rad = 0;
    this.throttle = 0;
    this.exploded = false;
    this.speed = {
      "x":0,
      "y":0,
      "z":1
    };
    this.elevator = 0;
    this.rudder = 0;
    this.aileron = 0;
    this.rotationSpeed = {
      "x":0,
      "y":0,
      "z":0
    }
    this.pitch = 0;
    
    this.recentPosture = [[{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],
                         [{"x":0,"y":1,"z":0},0,],];

    this.vertexes = [];

    this.edges = [];
    
    this.faces = [];
    
    this.faces.push([1,0,3,"#FFFFFF"]);
    this.faces.push([3,2,1,"#FFFFFF"]);
    this.faces.push([5,4,0,"#FFFFFF"]);
    this.faces.push([0,1,5,"#FFFFFF"]);
    this.faces.push([4,7,3,"#FFFFFF"]);
    this.faces.push([3,0,4,"#FFFFFF"]);
    this.faces.push([7,6,2,"#FFFFFF"]);
    this.faces.push([2,3,7,"#FFFFFF"]);
    this.faces.push([6,5,1,"#FFFFFF"]);
    this.faces.push([1,2,6,"#FFFFFF"]);
    this.faces.push([8,4,5,"#FFFFFF"]);
    this.faces.push([8,7,4,"#FFFFFF"]);
    this.faces.push([8,6,7,"#FFFFFF"]);
    this.faces.push([8,5,6,"#FFFFFF"]);
    this.faces.push([9,1,0,"#FFFFFF"]);
    this.faces.push([9,0,3,"#FFFFFF"]);
    this.faces.push([9,3,2,"#FFFFFF"]);
    this.faces.push([9,2,1,"#FFFFFF"]);
    
    this.faces.push([10,13,12,"#FFFFFF"]);
    this.faces.push([10,12,13,"#FFFFFF"]);
    this.faces.push([12,11,10,"#FFFFFF"]);
    this.faces.push([12,10,11,"#FFFFFF"]);
    this.faces.push([14,17,16,"#FFFFFF"]);
    this.faces.push([14,16,17,"#FFFFFF"]);
    this.faces.push([16,15,14,"#FFFFFF"]);
    this.faces.push([16,14,15,"#FFFFFF"]);
    
    this.faces.push([25,21,22,"#FFFFFF"]);
    this.faces.push([25,22,21,"#FFFFFF"]);
    this.faces.push([25,22,18,"#FFFFFF"]);
    this.faces.push([25,18,22,"#FFFFFF"]);
    this.faces.push([25,19,20,"#FFFFFF"]);
    this.faces.push([25,20,19,"#FFFFFF"]);
    this.faces.push([25,18,19,"#FFFFFF"]);
    this.faces.push([25,19,18,"#FFFFFF"]);
    this.faces.push([18,23,24,"#FFFFFF"]);
    this.faces.push([18,24,23,"#FFFFFF"]);
    this.faces.push([24,25,18,"#FFFFFF"]);
    this.faces.push([24,18,25,"#FFFFFF"]);
  
    this.faces.push([30,26,27,"#999999"]);
    this.faces.push([30,27,28,"#999999"]);
    this.faces.push([30,28,29,"#999999"]);
    this.faces.push([30,29,26,"#999999"]);
  }
  update() {
    this.vertexes = [];
    this.vertexes.push(new Vertex(-10,10,30));
    this.vertexes.push(new Vertex(10,10,30));
    this.vertexes.push(new Vertex(10,-10,25));
    this.vertexes.push(new Vertex(-10,-10,25));
    this.vertexes.push(new Vertex(-10,10,-30));
    this.vertexes.push(new Vertex(10,10,-30));
    this.vertexes.push(new Vertex(10,-10,-30));
    this.vertexes.push(new Vertex(-10,-10,-30));
    this.vertexes.push(new Vertex(0,10,-90));
    this.vertexes.push(new Vertex(0,5,45));
    this.vertexes.push(new Vertex(10,10,12));
    this.vertexes.push(new Vertex(70,10,12));
    this.vertexes.push(new Vertex(70,10,-15));
    this.vertexes.push(new Vertex(10,10,-15));
    this.vertexes.push(new Vertex(-10,10,12));
    this.vertexes.push(new Vertex(-70,10,12));
    this.vertexes.push(new Vertex(-70,10,-15));
    this.vertexes.push(new Vertex(-10,10,-15));
    
    this.vertexes.push(new Vertex(0,10,-70));
    this.vertexes.push(new Vertex(20,10,-80));
    this.vertexes.push(new Vertex(20,10,-90));
    this.vertexes.push(new Vertex(-20,10,-90));
    this.vertexes.push(new Vertex(-20,10,-80));
    this.vertexes.push(new Vertex(0,30,-79));
    this.vertexes.push(new Vertex(0,30,-87));
    this.vertexes.push(new Vertex(0,10,-90));
  
    this.vertexes.push(new Vertex(0,10,5));
    this.vertexes.push(new Vertex(8,10,-10));
    this.vertexes.push(new Vertex(0,10,-30));
    this.vertexes.push(new Vertex(-8,10,-10));
    this.vertexes.push(new Vertex(0,18,-10));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i] = rotate(this.axis,this.vertexes[i],this.rad);
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
  }
}

class Ground {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.visible = "ground";


    this.edges = [];
    
    this.faces = [];
    for (let i = 0; i < 19; i++) {
      this.faces.push([20,i,i+1]);
    }
    this.faces.push([20,19,0]);
  }
  update() {
    this.x = cam.x;
    this.y = 0;
    this.z = cam.z;
    this.vertexes = [];
    for (let i = 0; i < (2*Math.PI); i += (Math.PI/10)) {
    	this.vertexes.push(new Vertex(this.x + Math.cos(i)*30000, this.y, this.z + Math.sin(i)*30000));
    }
    this.vertexes.push(new Vertex(this.x, this.y, this.z));
  }
}

class runway {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.vertexes = [];
    this.vertexes.push(new Vertex(0,0,0));
    this.vertexes.push(new Vertex(-500,0,1500));
    this.vertexes.push(new Vertex(500,0,1500));
    this.vertexes.push(new Vertex(500,0,-15000));
    this.vertexes.push(new Vertex(-500,0,-15000));
    this.vertexes.push(new Vertex(0,0,0));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    this.faces.push([0,1,2,"#808080"]);
    this.faces.push([0,2,3,"#808080"]);
    this.faces.push([0,3,4,"#808080"]);
    this.faces.push([0,4,1,"#808080"]);
    this.faces.push([5,2,1,"#808080"]);
    this.faces.push([5,3,2,"#808080"]);
    this.faces.push([5,4,3,"#808080"]);
    this.faces.push([5,1,4,"#808080"]);
  }
}
var on = true;
class runway_light {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertexes = [];
    this.vertexes.push(new Vertex(0,10,0));
    this.vertexes.push(new Vertex(-10,0,10));
    this.vertexes.push(new Vertex(10,0,10));
    this.vertexes.push(new Vertex(10,0,-10));
    this.vertexes.push(new Vertex(-10,0,-10));
    this.vertexes.push(new Vertex(0,10,0));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    
      
      this.faces.push([0,1,2,"#FFFF00"]);
      this.faces.push([0,2,3,"#FFFF00"]);
      this.faces.push([0,3,4,"#FFFF00"]);
      this.faces.push([0,4,1,"#FFFF00"]);
      this.faces.push([5,2,1,"#FFFF00"]);
      this.faces.push([5,3,2,"#FFFF00"]);
      this.faces.push([5,4,3,"#FFFF00"]);
      this.faces.push([5,1,4,"#FFFF00"]);
    

      // this.faces.push([0,1,2,"#000000"]);
      // this.faces.push([0,2,3,"#000000"]);
      // this.faces.push([0,3,4,"#000000"]);
      // this.faces.push([0,4,1,"#000000"]);
      // this.faces.push([5,2,1,"#000000"]);
      // this.faces.push([5,3,2,"#000000"]);
      // this.faces.push([5,4,3,"#000000"]);
      // this.faces.push([5,1,4,"#000000"]);  
    
  }
}

class runway_paint {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertexes = [];
    this.vertexes.push(new Vertex(0,0,0));
    this.vertexes.push(new Vertex(-4,0,40));
    this.vertexes.push(new Vertex(4,0,40));
    this.vertexes.push(new Vertex(4,0,-40));
    this.vertexes.push(new Vertex(-4,0,-40));
    this.vertexes.push(new Vertex(0,0,0));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    
      
      this.faces.push([0,1,2,"#FFA500"]);
      this.faces.push([0,2,3,"#FFA500"]);
      this.faces.push([0,3,4,"#FFA500"]);
      this.faces.push([0,4,1,"#FFA500"]);
      this.faces.push([5,2,1,"#FFA500"]);
      this.faces.push([5,3,2,"#FFA500"]);
      this.faces.push([5,4,3,"#FFA500"]);
      this.faces.push([5,1,4,"#FFA500"]);
    

  }
}
class ring {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertexes = [];
    this.vertexes.push(new Vertex(-150,150,150));
    this.vertexes.push(new Vertex(150,150,150));
    this.vertexes.push(new Vertex(150,-150,150));
    this.vertexes.push(new Vertex(-150,-150,150));
    this.vertexes.push(new Vertex(-150,150,-150));
    this.vertexes.push(new Vertex(150,150,-150));
    this.vertexes.push(new Vertex(150,-150,-150));
    this.vertexes.push(new Vertex(-150,-150,-150));
    this.vertexes.push(new Vertex(150,150,-150));
    this.vertexes.push(new Vertex(150,150,150));
    this.vertexes.push(new Vertex(150,150,150));
    this.vertexes.push(new Vertex(150,150,150));
    this.vertexes.push(new Vertex(150,150,-150));
    this.vertexes.push(new Vertex(150,150,-150));
    this.vertexes.push(new Vertex(-150,150,150));
    this.vertexes.push(new Vertex(-150,150,150));
    this.vertexes.push(new Vertex(-150,150,-150));
    this.vertexes.push(new Vertex(-150,150,-150));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    
this.faces.push([1,0,3,"#FFA500"]);
    this.faces.push([3,2,1,"#FFA500"]);
    this.faces.push([5,4,0,"#FFA500"]);
    this.faces.push([0,1,5,"#FFA500"]);
    this.faces.push([4,7,3,"#FFA500"]);
    this.faces.push([3,0,4,"#FFA500"]);
    this.faces.push([7,6,2,"#FFA500"]);
    this.faces.push([2,3,7,"#FFA500"]);
    this.faces.push([6,5,1,"#FFA500"]);
    this.faces.push([1,2,6,"#FFA500"]);
    this.faces.push([8,4,5,"#FFA500"]);
    this.faces.push([8,7,4,"#FFA500"]);
    this.faces.push([8,6,7,"#FFA500"]);
    this.faces.push([8,5,6,"#FFA500"]);
    this.faces.push([9,1,0,"#FFA500"]);
    this.faces.push([9,0,3,"#FFA500"]);
    this.faces.push([9,3,2,"#FFA500"]);
    this.faces.push([9,2,1,"#FFA500"]);
    
  }
}
class boostParticle {
  constructor(x,y,z,r,size) {
    this.center = {
      "x":x,
      "y":y,
      "z":z
    }
    this.x = this.center.x;
    this.y = this.center.y;
    this.z = this.center.z;
    this.size = size;
    this.visible = true;
    this.vec = {"x":0,"y":0,"z":1};
    this.vec = rotate({"x":1,"y":0,"z":0},this.vec,Math.random()*Math.PI*2);
    this.vec = rotate({"x":0,"y":1,"z":0},this.vec,Math.random()*Math.PI*2);
    this.vec = rotate({"x":0,"y":0,"z":1},this.vec,Math.random()*Math.PI*2);
    this.vec.x *= r;
    this.vec.y *= r;
    this.vec.z *= r;
    this.prog = 0;
    this.alive = true;
    this.vertexes = [];
    this.vertexes.push(new Vertex(this.x,this.y,this.z));
    
    this.edges = [];

    this.faces = [];
    this.faces.push([0,this.size,"#FFFF00"]);
    
  }
}
class tower {
constructor(x,y,z,height,width) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.height = height;
    this.width = width;
    this.vertexes = [];
    this.vertexes.push(new Vertex(-width,height,width));
    this.vertexes.push(new Vertex(width,height,width));
    this.vertexes.push(new Vertex(width,-height,width));
    this.vertexes.push(new Vertex(-width,-height,width));
    this.vertexes.push(new Vertex(-width,height,-width));
    this.vertexes.push(new Vertex(width,-height,-width));
    this.vertexes.push(new Vertex(width,-height,-width));
    this.vertexes.push(new Vertex(-width,-height,-width));
    this.vertexes.push(new Vertex(width,height,-width));
    this.vertexes.push(new Vertex(width,height,width));
    this.vertexes.push(new Vertex(width,height,width));
    this.vertexes.push(new Vertex(width,height,width));
    this.vertexes.push(new Vertex(width,height,-width));
    this.vertexes.push(new Vertex(width,height,-width));
    this.vertexes.push(new Vertex(-width,height,width));
    this.vertexes.push(new Vertex(-width,height,width));
    this.vertexes.push(new Vertex(-width,height,-width));
    this.vertexes.push(new Vertex(-width,height,-width));
    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    
this.faces.push([1,0,3,"#808080"]);
    this.faces.push([3,2,1,"#808080"]);
    this.faces.push([5,4,0,"#808080"]);
    this.faces.push([0,1,5,"#808080"]);
    this.faces.push([4,7,3,"#808080"]);
    this.faces.push([3,0,4,"#808080"]);
    this.faces.push([7,6,2,"#808080"]);
    this.faces.push([2,3,7,"#808080"]);
    this.faces.push([6,5,1,"#808080"]);
    this.faces.push([1,2,6,"#808080"]);
    this.faces.push([8,4,5,"#808080"]);
    this.faces.push([8,7,4,"#808080"]);
    this.faces.push([8,6,7,"#808080"]);
    this.faces.push([8,5,6,"#808080"]);
    this.faces.push([9,1,0,"#808080"]);
    this.faces.push([9,0,3,"#808080"]);
    this.faces.push([9,3,2,"#808080"]);
    this.faces.push([9,2,1,"#808080"]);
    
  }
}
class Tree {
    constructor(x,y,z,stem,leaf,width) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertexes = [];
      //BUG: Sometimes trunk will be rendered through the "leafs"
      //leaf
   this.vertexes.push(new Vertex(0,leaf,0));
    this.vertexes.push(new Vertex(-width,0,width*0.4));
    this.vertexes.push(new Vertex(width,0,width*0.4));
    this.vertexes.push(new Vertex(width,0,-width*0.4));
    this.vertexes.push(new Vertex(-width,0,-width*0.4));
    //Trunk
    this.vertexes.push(new Vertex(width/2,-stem,0))
    this.vertexes.push(new Vertex(-width/2,-stem,0));
    this.vertexes.push(new Vertex(0,-stem,width/2))
    this.vertexes.push(new Vertex(0,-stem,-width/2))

    for (let i = 0; i < this.vertexes.length; i++) {
      this.vertexes[i].x += this.x;
      this.vertexes[i].y += this.y;
      this.vertexes[i].z += this.z;
    }
    
    this.faces = [];
    var bushColor = green()
    this.faces.push([5,0,6,"#964B00"]);
    this.faces.push([6,6,7,"#964B00"])
    this.faces.push([7,0,8,"#964B00"])
    this.faces.push([8,0,5,"#964B00"])
    this.faces.push([1,2,4,bushColor])
    this.faces.push([2,3,1,bushColor])
    this.faces.push([4,2,1,bushColor])
    this.faces.push([3,2,4,bushColor])
    this.faces.push([0,1,2,bushColor]);
    this.faces.push([0,2,3,bushColor]);
    this.faces.push([0,3,4,bushColor]);
    this.faces.push([0,4,1,bushColor]);
  }
}