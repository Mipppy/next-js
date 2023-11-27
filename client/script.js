var canvas = document.getElementById("main");
let ctx = document.getElementById("main").getContext("2d");
ctx.translate(400, 300);

//camera
let cam = {
  "axis": { "x": 0, "y": 1, "z": 0 },
  "rad": 0,
  "x": 0,
  "y": 40,
  "z": 0
}
//the array in which all objects are stored  
let objects = [];
var hitbuilding = false;
let coolTime = 15;
var soundRev = new Audio("audio/rev.mp3");
var soundCrash = new Audio("audio/crash.mp3");
var soundLanding = new Audio("audio/land.mp3");
var soundSwoosh = new Audio("audio/swoosh.mp3");
var score = 0
let gyroMode = false;
class Vertex {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
//arrays for storing loaded objects
let ground = new Ground();
let bullets = [];
let targets = [];
let blasts = [];
let rings = []
let building = []
let trees = []
//creation
let aircraft = new Aircraft(0, 0, 0);

loadEntities()

function mainLoop() {
  //movement
var renderDistance = document.getElementById('render')
  var sense = 1
  if (gyroMode) {
    ctrWithGyro();
  }else{
    if (key.e) {
      aircraft.rudder = sense;
    }else if (key.q) {
      aircraft.rudder = -sense;
    }else{
      aircraft.rudder = 0;
    }
    if (key.a) {
      aircraft.aileron = sense;
    }else if (key.d) {
      aircraft.aileron = -sense;
    }else{
      aircraft.aileron = 0;
    }
    if (key.w) {
      aircraft.elevator = sense;
    }else if (key.s) {
      aircraft.elevator = -sense;
    }else{
      aircraft.elevator = 0;
    }
    
    if (key.i) {
      if (aircraft.throttle < localStorage.getItem('throttle')) {
        aircraft.throttle += 0.01;
      }
    }
    if (key.k) {
      if (aircraft.throttle > 0) {
        aircraft.throttle -= 0.01;
      }
    }

  }
   
  aircraftPB();

  //counting down for next bullet spawn
  if (!aircraft.exploded) {
    if (coolTime > 0) {
      coolTime--;
    }
    //appending bullet to array for creation later
    if (key.j && coolTime <= 0) {
      let vec = getLocalZAxis(aircraft.axis,aircraft.rad);
      vec.x *= 100;
      vec.y *= 100;
      vec.z *= 100;
      let add = rotate(aircraft.axis,aircraft.speed,aircraft.rad);
      vec.x += add.x;
      vec.y += add.y;
      vec.z += add.z;
      bullets.push(new Bullet(aircraft.x, aircraft.y, aircraft.z, vec));
      objects.push(bullets[bullets.length-1]);
      coolTime = 10;
    }
    
    aircraft.update();
    aircraft.recentPosture.shift();
    aircraft.recentPosture.push([aircraft.axis, aircraft.rad]);

    
    //camera mode
    let newCamPos;
   if (camera == 1) {
      newCamPos = rotate(aircraft.recentPosture[0][0], { "x": 0, "y": 60, "z": 20 }, aircraft.recentPosture[0][1]); 
   }
  else {
     newCamPos = rotate(aircraft.recentPosture[0][0], { "x": 0, "y": 40, "z": -300 }, aircraft.recentPosture[0][1]); 
  }
    
    //camera  update
    cam.x = aircraft.x + newCamPos.x;
    cam.y = aircraft.y + newCamPos.y;
    if (cam.y < 10) {
      cam.y = 10;
    }
    cam.z = aircraft.z + newCamPos.z;
    cam.axis = aircraft.recentPosture[0][0];
    cam.rad = aircraft.recentPosture[0][1];

    
    ground.update();

    boost()
    
    //spawning bullets
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].x += bullets[i].vec.x;
      bullets[i].y += bullets[i].vec.y;
      bullets[i].z += bullets[i].vec.z;
      bullets[i].vertexes = [];
      bullets[i].vertexes.push(new Vertex(bullets[i].x,bullets[i].y,bullets[i].z));
      let relX = bullets[i].x-aircraft.x;
      let relY = bullets[i].y-aircraft.y;
      let relZ = bullets[i].z-aircraft.z;

      //despawning bullet once out of render distance
      if (Math.sqrt(relX**2+relY**2+relZ**2) > 30000 || bullets[i].y < 3) {
        bullets[i].dead = true;
        bullets.splice(i,1);
        i--;
      }else{
        //bullet collison detection
        for (let j = 0; j < targets.length; j++) {
          relX = bullets[i].x-targets[j].x;
          relY = bullets[i].y-targets[j].y;
          relZ = bullets[i].z-targets[j].z;
          if (Math.sqrt(relX**2+relY**2+relZ**2) < 400) {
                        score++;

            for (let k = 0; k < 20; k++) {
              blasts.push(new Blast(targets[j].x,targets[j].y,targets[j].z,400,70));
              objects.push(blasts[blasts.length-1]);
            }
            //removing target and bullet
            targets[j].dead = true;
            targets.splice(j,1);
            j--;
            bullets[i].dead = true;
            bullets.splice(i,1);
            i--;
            //2 new targets once one is destroyed
            targets.push(new Target(aircraft.x+rndInt(-3000,3000), rndInt(100,2000), aircraft.z+rndInt(-3000,3000)));
            objects.push(targets[targets.length-1]);
            targets.push(new Target(aircraft.x+rndInt(-3000,3000), rndInt(100,2000), aircraft.z+rndInt(-3000,3000)));
            objects.push(targets[targets.length-1]);
            break;
          }
        }
      }
    }
    //Creating a explosion for target hit
    for (let i = 0; i < blasts.length; i++) {
      let blast = blasts[i];
      blast.prog += 0.02;
      if (blast.prog <= 1) {
        blast.x = blast.center.x + (blast.vec.x * (1-(1-blast.prog)**2));
        blast.y = blast.center.y + (blast.vec.y * (1-(1-blast.prog)**2));
        blast.z = blast.center.z + (blast.vec.z * (1-(1-blast.prog)**2));
        const size = blast.size * ((1-blast.prog)**2);
        blast.vertexes = [];
        blast.vertexes.push(new Vertex(blast.x,blast.y,blast.z));
        blast.faces = [];
        blast.faces.push([0,size,"#FF0000"])
      }
      
      if (blast.prog > 1 || blast.y < 10) {
        blast.dead = true;
        blasts.splice(i,1);
        i--;
      }
    }
    //removing dead objects
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].dead) {
        objects.splice(i,1);
        i--;
        break;
      }
      
      let relX = objects[i].x-aircraft.x;
      let relY = objects[i].y-aircraft.y;
      let relZ = objects[i].z-aircraft.z;

      //render distance
      if (Math.sqrt(relX**2+relY**2+relZ**2) < renderDistance.value || objects[i].visible === "ground") {
        objects[i].visible = true;
      }else{
        objects[i].visible = false;
      }
    }
    if (score > localStorage.getItem('highscore')) {
      localStorage.setItem('highscore',score)
    }
    else if (localStorage.getItem('highscore') == null) {
      localStorage.setItem('highscore',0)
    }

    
    buildingCollison()
    //recursivly calling mainLoop()
    draw();
    requestAnimationFrame(mainLoop);
  }else{
    if (!hitbuilding) {
    drawGameOver("YOU CRASHED");
    }
    else if (hitbuilding){
      drawGameOver("this is not 9/11 simulator");
    }
  }
}

mainLoop();

//randon numbers
function rndInt(min,max) {
  return Math.floor( Math.random() * (max + 1 - min) ) + min;
}


//FPS
var times = [];
var fps;

function refreshLoop() {
  window.requestAnimationFrame(function() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    refreshLoop();
  });
}
refreshLoop();


function boost() {
      //rings speed up
    for (let i = 0; i < rings.length; i++) {
      var boostX = aircraft.x-rings[i].x ;
      var boostY = aircraft.y-rings[i].y ;
      var boostZ = aircraft.z-rings[i].z ;
      if (Math.sqrt(boostX**2+boostY**2+boostZ**2) < 300) {
        if (!aircraft.boosting) {
          aircraft.speed.x*= 1.8;
          aircraft.speed.z *= 1.8;
          aircraft.boosting = true;       
        }
        else {
        }
      }
      aircraft.boost_cool++
      if (aircraft.boost_cool >= 750) {
        aircraft.boost_cool = 0;
        aircraft.boosting = false;
      }
    }

}

function buildingCollison() {
  //Holy hell this logic took me 2 straight hours to figure out
  for (let i = 0; i < building.length; i++) {
      var objectCollisonX = aircraft.x-building[i].x ;
      var objectCollisonY = aircraft.y-building[i].y ;
      var objectCollisonZ = aircraft.z-building[i].z ;
      if (objectCollisonX < building[i].width && objectCollisonZ < building[i].width && objectCollisonZ > -building[i].width && objectCollisonX > -building[i].width && objectCollisonY < building[i].height) {
aircraft.exploded = true
        hitbuilding = true
      }
}
}
// function audioHandling() {
//   for (let i = 0; i < building.length; i++) {
//       var objectCollisonX = aircraft.x-building[i].x ;
//       var objectCollisonY = aircraft.y-building[i].y ;
//       var objectCollisonZ = aircraft.z-building[i].z ;
//       if (objectCollisonX < building[i].width + 200 && objectCollisonZ < building[i].width + 200 && objectCollisonZ > -building[i].width -200 && objectCollisonX > -building[i].width -200 && objectCollisonY < building[i].height+200 ) {
//       if ()
//     }
//   }
// }
// function stopSounds() {
//   soundRev.stop()
//   soundCrash.stop()
//   soundSwoosh.stop()
//   soundLanding.stop()
// }
function loadEntities() {
objects.push(aircraft);

for (var i = 0; i < 250; i++) {
  var stem_height = rndInt(200,400)
  var leaves_height = rndInt(200,400)
  trees.push(new Tree(rndInt(-30000,30000)+1000, stem_height, rndInt(-30000,30000)+1000,stem_height, leaves_height,rndInt(150,450)))
  objects.push(trees[i])
}

for (var i = 0; i < 90; i++) {
  let height = rndInt(0,15000)
  building.push(new tower(rndInt(1000,60000),height,rndInt(1000,60000),height,rndInt(100,800)))
  objects.push(building[i])
}

objects.push(new runway(0,1,9500))
// for (var i = 0; i < 60; i++) {
//   rings.push(new ring(rndInt(-30000,30000),rndInt(100,2000),rndInt(-30000,30000)))
//   objects.push(rings[i])
// }
//draw();
for (var i = 0; i < 27; i++) {
  objects.push(new runway_light(375,1, i*400))
}
for (var i = 0; i < 27; i++) {
  objects.push(new runway_light(-375,10,i*400))
}
for (var i = 0; i < 27; i++) {
  objects.push(new runway_paint(0,1,i*400))
}

}