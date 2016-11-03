var classes = ["Algebra 2 CP", "AP Computer Science Principles", "AP Computer Science A"];

function teacherClassSet() {
  var dropdown = document.getElementById("subject");
  for (let i of classes) {
    var temp = "<option value='" + i + "'>" + i + "</option>";
    dropdown.innerHTML += temp;
  }
}

function hwSubmit() {
  var temp = document.getElementById("hwPost");
  var hw = temp.value;
  var date = document.getElementById("date").value;
  var subject = document.getElementById("subject").value;
  temp.value = "";
  console.log(date + subject + hw);
  confirm("Homework posted!");
}
