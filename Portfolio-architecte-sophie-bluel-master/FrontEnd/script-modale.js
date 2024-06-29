let _works = [];
let _categories = [];

function getWorks() {
    fetch('http://localhost:5678/api/works')
        .then(resp => resp.json())
        .then(works => {
            _works.push(...works);
            initCategories(works);
            displayWorks(works);
        });
}   

function initCategories(works) {
    _categories = Array.from(new Set(works.map(work => work.category.id)))
        .map(id => works.find(work => work.category.id === id).category);
}    


function displayWorks(listWorks, categoryId) {
    const gallery = document.querySelector('#portfolio .gallery');
    gallery.innerHTML = '';
    listWorks.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title; 
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        });

    };

getWorks();

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



