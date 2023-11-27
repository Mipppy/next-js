//Dynamically load all other files.
//Think of this file as a "file hub", for loading/unloading javascript files.
//This also will house level menu and gui
document.getElementById('main').style.display = 'none'

function loadWithWait(){
  var loading = document.getElementById('loading')
  var loadingBar = document.getElementById('loadingbar')
  var loadingMessage = document.getElementById('currentFileLoading')
  document.getElementById('pageOnLoad').style.display = 'none'
  document.getElementById('main').style.display = 'block'
  loading.style.display = 'block'
  loadingMessage.style.display = 'block'
  var filesToLoad = ['diff','adj_canvas_size','key','quat','model','draw','physical_behavior','script']
  var i = 0
  var q = setInterval(()=> {
    loadingMessage.innerHTML = `Loading ${filesToLoad[i]}.js`
    loadingBar.style.width = i*12.5+'%'
    load(filesToLoad[i])
    if (i >= filesToLoad.length) {
      clearInterval(q)
      loading.style.display = 'none'
      loadingMessage.style.display = 'none'
      document.getElementById('pageOnLoad').style.display = 'none'
    }
    i++
  },100)
}
showMainMenu()


//load and unload functions for convience.
function load(file) {
  var currentFile = document.createElement('script')
  document.body.appendChild(currentFile)
  currentFile.src = file + '.js'
  currentFile.async = true;
}
function unload(file) {
  for (var i = 0; i < document.querySelectorAll('script').length; i++) {
    var allScripts = document.querySelectorAll('script')
    if (allScripts[i].src == file) {
      document.getElementById(allScripts[i].id).remove()
    }
  }
}


function showMainMenu(){
  var gui = document.getElementById('pageOnLoad')
  gui.style.display = 'block'
}

var arrOfIds = ['achievements','about','settings','help']
function displayMenu(menu) {
  for (var i = 0; i < arrOfIds.length; i++) {
    document.getElementById(`${arrOfIds[i]}Div`).style.display = 'none'
  }
  if (menu != 'close') {
    var a = document.getElementById(`${menu}Div`)
    a.style.display = 'block'
    a.style.animation = 'fade_in_show 1s'
  }
}



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
//Enforcing input max and min
function enforceMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
  //saving values to localStorage.
  localStorage.setItem(`${el.id}`, el.value)
}

let achievementids = ["00", "01","02","03","04"]
let achieve = new Map([
  [0,["Takeoff!", "Go on your first freefly", "",localStorage.getItem("00")]],
  [1,["Hat's off to you!", "???", "",localStorage.getItem("01")]],
  [2,["Cheater!", "Open the cheat menu in settings","", localStorage.getItem("02")]],
  [3,["???", "giveSecretAchievement()","",localStorage.getItem("03")]],
  [4,["Kamikaze","Slam into 100 buildings","",localStorage.getItem("04")]],
])
achievements()

function achievements() {
  for (var i = 0; i < achievementids.length; i++) {
    if (localStorage.getItem(achievementids[i]) == null) {
      localStorage.setItem(achievementids[i], 0)
    }
  }
  for (var i = 0; i < achievementids.length; i++) {
    var currentDiv = document.createElement('div')
    currentDiv.classList.add("achievementList")
    document.getElementById('achievementsDiv').appendChild(currentDiv)
    var achievementTitle = document.createElement('h2')
    var achievement = achieve.get(i)
    achievementTitle.innerHTML = achievement[0]
    currentDiv.appendChild(achievementTitle)
    var description = document.createElement('p')
    description.innerHTML = achievement[1]
    currentDiv.appendChild(description)
  }
}