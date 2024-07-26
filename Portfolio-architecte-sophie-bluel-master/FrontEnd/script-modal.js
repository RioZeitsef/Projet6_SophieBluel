document.addEventListener("DOMContentLoaded", () => {
  getWorks(false);
  fetchCategories();
});

// création de la modale et de ses boutons de navigation / suppresion

var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");
var btn = document.getElementById("mybtn");
var span = document.getElementsByClassName("modalclose");
var addPhotos = document.getElementById("addPhotos");
var arrowBack = document.getElementById("modalBack");

btn.onclick = function () {
  modal1.style.display = "block";
};

for (var i = 0; i < span.length; i++) {
  span[i].addEventListener("click", function () {
    modal1.style.display = "none";
    modal2.style.display = "none";
  });
}  

arrowBack.onclick = function () {
  modal2.style.display = "none";
  modal1.style.display = "block";
};  

addPhotos.onclick = function () {
  modal1.style.display = "none";
  modal2.style.display = "block";
};  

window.onclick = function (event) {
  if (event.target == modal1 || event.target == modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
});

// Ajout & suppression des images dans la modale

//Appel à l'API "Works" pour récupérer les images
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(images => {
    const modal = document.querySelector('.js-modal');
    const button = modal.querySelector('.js-modal-addPhotos');

    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'images-container';
    
    // Pour chaque image que j'intègre dans une div pour intégrer le bouton de suppression également
    images.forEach(image => {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'image-wrapper';
        
      const imgElement = document.createElement('img');
      imgElement.src = image.imageUrl; 
      imgWrapper.appendChild(imgElement);

      const deleteButton = document.createElement('button'); // Crée le bouton de suppression
      deleteButton.textContent = 'Supprimer';
      deleteButton.className = 'delete-button';
      deleteButton.onclick = function() {
        const id = image.id;
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if(response.ok) {
            imgWrapper.remove(); // Supprime l'image
          } else {
            alert('Une erreur est survenue lors de la suppression de l\'image');
          }
        })
        .catch(error =>{
          console.error('Erreur lors de la suppression de l\'image:', error);
        });
      };
      imgWrapper.appendChild(deleteButton);

      imagesContainer.appendChild(imgWrapper);
    });
    
    modal.insertBefore(imagesContainer, button);
  })
  .catch(error => console.error('Erreur lors de la récupération des images:', error));

// récupération des catégories pour l'ajout d'images dans la biblio

function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      const categorySelect = document.getElementById("category");
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories:', error);
  }); 
}

// application de la methode POST sur le bouton Valider 