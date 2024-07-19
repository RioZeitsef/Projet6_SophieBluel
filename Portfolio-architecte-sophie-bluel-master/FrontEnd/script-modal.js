document.addEventListener("DOMContentLoaded", () => {
  getWorks(false);
});

// création de la modale et de ses boutons de navigation / suupresion

var modal = document.getElementById("modal1");
var btn = document.getElementById("mybtn");
var span = document.getElementsByClassName("modalclose")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    modal.style.display = "none";
  }
});

// Ajout & suppression des images dans la modale

//Appel à l'API "WWorks" pour récupérer les images
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
        const token = localstorage.getItem('token');
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


