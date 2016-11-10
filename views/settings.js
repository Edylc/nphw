var URL = "http://nphw.herokuapp.com";
var allClasses = []; //StudentClass objects
var ownClasses = []; //reference ID #s

//includes vs equals vs ===, string vs int
//password issues in config.js
var addClass = function(curClass) {
  var i = getClassById(curClass)[0];
  classes = [];
  console.log(i);
  if (!ownClasses.includes(curClass)) {
    ownClasses.push(curClass);
    var temp = document.getElementById("currentClasses");
    temp.innerHTML += "<tr id='remove" + i.id + "'><td>" + i.teacher + "</td><td>" + i.className + "<input type='button' value='remove' class = 'remove' onclick='removeClass(" + i.id + ");'></td></tr>";
    httpPostAsync(URL + "/add-class", ownClasses, function(response) {
     displayOwnClasses();
    });
  }
}

var loadAllClasses = function() {
  httpGetAsync(URL + "/all-classes", function(response) {
    var classes = JSON.parse(response);
    for (let temp of classes) {
      var classID = temp.path.key;
      var className = temp.value.name;
      var classTeach = temp.value.teacher;
      var classSub = temp.value.subject;
      var classSSub = temp.value.subjectShort;
      allClasses.push(new studentClass(classSub, classSSub, classTeach, className, classID));
    }
    displayAllClasses();
    loadOwnClasses();
  });
}

var loadOwnClasses = function() {
  httpGetAsync(URL + "/own-classes", function(response) {
    var classes = JSON.parse(response).classes;
    for (let temp of classes) {
      ownClasses.push(temp);
    }
    displayOwnClasses();
  });
}

var displayAllClasses = function() {
  for (let i of allClasses) {
    var temp = document.getElementById(i.subjectShort);
    temp.innerHTML += '<li id="' + i.id + '" onclick="addClass(\'' + i.id + '\');">' + i.className + " - " + i.teacher + "</li>";
  }
}

var displayOwnClasses = function() {
  if (ownClasses.length !== 0) {
    document.getElementById("currentClasses").innerHTML = "";
    for (let classIndex of ownClasses) {
      var temp = document.getElementById("currentClasses");
      var j = getClassById(classIndex);
      var i = j[0];
      temp.innerHTML += "<tr id='remove" + i.id + "'><td>" + i.teacher + "</td><td>" + i.className + "<input type='button' value='remove' class = 'remove' onclick='removeClass(" + i.id + ");'></td></tr>";
    }
  }
}

var getClassById = function(index) {
  return allClasses.filter(function(obj) {
    return obj.id === index;
  });
}

var studentClass = function(subject, subjectShort, teacher, className, id) {
  this.subject = subject;
  this.subjectShort = subjectShort;
  this.teacher = teacher;
  this.className = className;
  this.id = id;
}

function httpPostAsync(theUrl, data, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        alert(xmlHttp.responseText);
    }
  }
  xmlHttp.send(data);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
