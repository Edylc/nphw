var studentClass = function(subject, subjectShort, teacher, className, id) {
  this.subject = subject;
  this.subjectShort = subjectShort;
  this.teacher = teacher;
  this.className = className;
  this.id = id;
}

var homeworkAssignment = function(id, date, assignment) {
  this.id = id;
  this.date = date;
  this.assignment = assignment;
}

var allClasses = [];
var ownClasses = [new studentClass("Mathematics", "math", "Jorge Soto", "IB Math HL", 4)];
var homework = [];

allClasses.push(new studentClass("CTE", "cte", "Kristian Atkins", "Woodshop", 1));
allClasses.push(new studentClass("English", "eng", "Janet Conner", "IB English HL2", 2));
allClasses.push(new studentClass("Health", "health", "Lorena Caulfied", "Health", 3));
allClasses.push(new studentClass("Mathematics", "math", "Jorge Soto", "IB Math HL", 4));
allClasses.push(new studentClass("PE", "pe", "Mike Conway", "PE", 5));
allClasses.push(new studentClass("Science", "sci", "IB Chemistry HL", "Deborah Dogancay", 6));
allClasses.push(new studentClass("Social Science", "socsci", "IB 20th Century History", "Stephen Johnson", 7));
allClasses.push(new studentClass("Special Education", "sped", "dunno", "IDK", 8));
allClasses.push(new studentClass("Visual/Performing Arts", "vpa", "Jennifer Kaye", "AP Art History", 9));
allClasses.push(new studentClass("World Languages", "wla", "Seth Geher", "IB Spanish SL", 10));

homework.push(new homeworkAssignment(1, "2016-09-26", "make boat"));
homework.push(new homeworkAssignment(2, "2016-09-27", "make poem"));
homework.push(new homeworkAssignment(3, "2016-09-26", "be health"));
homework.push(new homeworkAssignment(4, "2016-09-27", "HW 8.5 p.3289 #1-80 x2"));
homework.push(new homeworkAssignment(5, "2016-09-26", "be health"));
homework.push(new homeworkAssignment(6, "2016-09-27", "ice cream"));
homework.push(new homeworkAssignment(7, "2016-09-26", "kill ferdinand"));
homework.push(new homeworkAssignment(8, "2016-09-27", "sped"));
homework.push(new homeworkAssignment(9, "2016-09-26", "make art"));
homework.push(new homeworkAssignment(10, "2016-09-27", "be spanish"));
homework.push(new homeworkAssignment(2, "2016-09-26", "write book"));
homework.push(new homeworkAssignment(5, "2016-09-27", "make poem"));

function teacherClassSet() {
  var dropdown = document.getElementById("subject");
  for (let i of allClasses) {
    var temp = "<option value='" + i.id + "'>" + i.className + "</option>";
    dropdown.innerHTML += temp;
  }
}

function hwSubmit() {
  var temp = document.getElementById("hwPost");
  var hw = temp.value;
  var date = document.getElementById("date").value;
  var id = document.getElementById("subject").value;
  if (!date) {
    alert("Missing date!");
    return;
  }
  if (!id) {
    alert("Missing class choice!");
    return;
  }
  if (!hw) {
    alert("Homework post is empty!");
    return;
  }
  temp.value = "";
  homework.push(new homeworkAssignment(id, date, hw));
  console.log(id + date + hw);
  alert("Homework posted!");
}

var hwDisplay = function() {
  var date = document.getElementById("datepicker").value;
  var toDisplay = getHwByDate(date);
  var temp = document.getElementById("resultBody");
  console.log(date);
  console.log(toDisplay);
  temp.innerHTML = "";
  if(!toDisplay) {
    return;
  }
  toDisplay.forEach(function(item, index) {
    var className = getClassById(item.id)[0].className;
    var hw = item.assignment;
    temp.innerHTML += "<tr><td>" + className + "</td><td>" + hw + "</td></tr>";
  });
}

var getHwByDate = function(date) {
  return homework.filter(function(obj) {
    return obj.date === date;
  });
  return [];
}

var loadClasses = function() {
  for (let i of allClasses) {
    var temp = document.getElementById(i.subjectShort);

    temp.innerHTML += "<li id='" + i.id + "' onclick='addClass(" + i.id + ");'>" + i.className + " - " + i.teacher + "</li>";
  }
  if (ownClasses.length !== 0) {
    document.getElementById("currentClasses").innerHTML = "";
    for (let i of ownClasses) {
      var temp = document.getElementById("currentClasses");
      temp.innerHTML += "<tr id='remove" + i.id + "'><td>" + i.teacher + "</td><td>" + i.className + "<input type='button' value='remove' class = 'remove' onclick='removeClass(" + i.id + ");'></td></tr>";
    }
  }
}

var getClassById = function(index) {
  return allClasses.filter(function(obj) {
    return obj.id === index;
  });
}

var removeClass = function(removeIndex) {
  var temp = document.getElementById("remove" + removeIndex);
  temp.parentNode.removeChild(temp);
  var place = ownClasses.indexOf(getClassById(removeIndex));
  ownClasses.splice(place, 1);
}

var addClass = function(index) {
  var i = getClassById(index)[0];
  if (!ownClasses.includes(i)) {
    ownClasses.push(i);
    if (ownClasses.length === 1) {
      document.getElementById("currentClasses").innerHTML = "";
    }
    var temp = document.getElementById("currentClasses");
    temp.innerHTML += "<tr id='remove" + i.id + "'><td>" + i.teacher + "</td><td>" + i.className + "<input type='button' value='remove' class = 'remove' onclick='removeClass(" + i.id + ");'></td></tr>";
  }
}
