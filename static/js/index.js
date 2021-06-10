
// Get the button that opens the modal
// var btn = document.getElementById("myBtn").onclick = () => {
//     console.log('hello');
// };

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
function clickedDiv(id){
    console.log("myModal-" + id);
    document.getElementById("myModal-" + id).style.display = "block";
}

// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }