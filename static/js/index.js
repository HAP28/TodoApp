// When the user clicks on the button, open the modal
function clickedDiv(id) {
  console.log("myModal-" + id);
  document.getElementById("myModal-" + id).style.display = "block";
}

// When the user clicks on <span> (x), close the modal

function validation() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  if (title.trim() == "" || description.trim() == "") return false;
  else return true;
}
function validationUpdate(id) {
    console.log(id);
    var title = document.getElementById("titleUpdate"+id).value;
    var description = document.getElementById("descriptionUpdate"+id).value;
    if (title.trim() == "" || description.trim() == "") return false;
    else return true;
  }
