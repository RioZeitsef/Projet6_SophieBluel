getWorks(false);

var modal = document.getElementById("modal1");
var btn = document.getElementById("mybtn");
var span = document.getElementsByClassName("modalclose")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



