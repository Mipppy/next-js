//The file with my custom, unrelated javascript stuff
//(mostly DOM stuff for extra styling, etc)

Audio.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
};

//loading from localStorage
var inputArrSettings = ['thrust','throttle','pitch','senstivity','render']
document.getElementById('thrust').value = localStorage.getItem('thrust')
for (var i = 0; i < inputArrSettings.length; i++) {
  //if null, set defaults
  if (localStorage.getItem(inputArrSettings[i]) == null) {
    if (inputArrSettings[i] == 'thrust'){
      document.getElementById(inputArrSettings[i]).value =  180;
    }
    else if (inputArrSettings[i] == 'pitch') {
      document.getElementById(inputArrSettings[i]).value = 180;
    }
    else if (inputArrSettings[i] == 'render') {
      document.getElementById(inputArrSettings[i]).value = 30000;
    }
    else {
      document.getElementById(inputArrSettings[i]).value = 1;
    }
  }
  else {
    document.getElementById(inputArrSettings[i]).value =         
      localStorage.getItem(inputArrSettings[i])
  }
}


var camera = 0
//Refreshing on "r"  press
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 82) {
    location.reload()
  }
  else if (e.keyCode == 67) {
    if (camera == 0) {
      camera = 1
    }
    else if (camera == 1) {
      camera = 0
    }
  }
  else if (e.key == 'b') {
    DownloadCanvasAsImage()
  }
})
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
var max = 125;
var min = 50;
function green() {
  return rgbToHex(0,Math.floor(Math.random() * (max - min + 1)) + min,0);
}
function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('main');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
}